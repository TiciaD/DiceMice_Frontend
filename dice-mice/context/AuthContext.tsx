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
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false); // Prevents multiple fetch attempts
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      console.log('fetching', fetching);
      if (fetching) return; // Prevent re-entry
      setFetching(true);

      let token = localStorage.getItem('token') ?? '';
      console.log('token', token);
      if (!token) {
        try {
          const { data: loginData } = await api.get('/auth/login');

          token = loginData.token; // Extract token from login response
          const refreshToken = loginData.refreshToken; // Save refresh token too

          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
        } catch (error) {
          console.error('Error initiating login flow:', error);
          setFetching(false); // Stop fetch attempts
          setLoading(false);
          // router.push('/unauthorized'); // Redirect to unauthorized page on error
          return;
        }
        return;
      }

      //   try {
      //     // With a valid token, fetch user data
      //     const { data: userData } = await api.get('/auth/me', {
      //       headers: { Authorization: `Bearer ${token}` },
      //     });

      //     setUser(userData); // Save user data to state
      //   } catch (error: any) {
      //     if (error.response?.status === 401) {
      //       // Token might be expired; try refreshing it
      // await handleTokenRefresh();
      //     } else {
      //       console.error(
      //         'Failed to fetch user data:',
      //         error.response?.statusText
      //       );
      //       router.push('/unauthorized');
      //     }
      //   } finally {
      //     setFetching(false); // Stop fetch attempts
      //     setLoading(false);
      //   }
    };

    // const handleTokenRefresh = async () => {
    //   try {
    //     const refreshToken = localStorage.getItem('refreshToken');
    //     if (!refreshToken) {
    //       throw new Error('No refresh token found');
    //     }

    //     const { data: refreshData } = await api.post('/auth/refresh', {
    //       refreshToken,
    //     });

    //     const newToken = refreshData.token;
    //     localStorage.setItem('token', newToken);
    //     fetchUser(); // Retry fetching the user after refreshing the token
    //   } catch (error) {
    //     console.error('Error refreshing token:', error);
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('refreshToken');
    //     router.push('/unauthorized');
    //     setFetching(false); // Stop fetch attempts
    //     setLoading(false);
    //   }
    // };

    fetchUser();
  }, [router]);

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
