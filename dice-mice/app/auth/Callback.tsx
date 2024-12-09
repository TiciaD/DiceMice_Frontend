import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const { token, refreshToken } = router.query;

    if (token && refreshToken) {
      // Save tokens to localStorage (or cookies if preferred)
      localStorage.setItem('token', token as string);
      localStorage.setItem('refreshToken', refreshToken as string);

      // Redirect to the home page or a protected route
      router.push('/');
    }
  }, [router.query]);

  return <p>Redirecting...</p>;
};

export default AuthCallback;
