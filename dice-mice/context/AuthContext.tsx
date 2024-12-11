'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/models/User.model';
import api from '@/utils/axios';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem('token') ?? '';
    if (!token) {
      return
    } else {
      console.log("is the token valid?", isTokenValid(token))
      // Check if token is expired
      if (!isTokenValid(token)) {
        window.location.href = process.env.NEXT_PUBLIC_API_URL + '/auth/login';
      } else {
        fetchUser(token)
      }
    }
  }, [router])

  const fetchUser = async (token: string) => {
    console.log("fetching user")
    try {
      // With a valid token, fetch user data
      const { data: userData } = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("fetch user response", userData)

      setUser(userData.user as User)

      localStorage.setItem('userId', userData.user.discordId);
      localStorage.setItem('avatar', userData.user.avatar);
    } catch (error: any) {
      console.error('Failed to fetch user data:', error);
      handleLogout()
    } finally {
      setLoading(false); // Ensure loading stops
    }
  }

  const isTokenValid = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now(); // `exp` is in seconds, so multiply by 1000
  };

  const handleLogout = () => {
    // Clear user data and localStorage on logout
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('avatar');
    router.push('/'); // Redirect to home page
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
