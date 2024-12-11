'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    // const refreshToken = searchParams.get('refreshToken');

    if (token && typeof window !== 'undefined') {
      // Save tokens to localStorage
      localStorage.setItem('token', token);
      // localStorage.setItem('refreshToken', refreshToken);

      // Redirect to the home page after saving tokens
      router.push('/');
    }
  }, [searchParams, router]);

  return <p>Redirecting...</p>;
};

const Callback = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CallbackContent />
    </Suspense>
  );
};

export default Callback;

