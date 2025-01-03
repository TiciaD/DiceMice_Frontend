'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token && typeof window !== 'undefined') {
      // Save tokens to localStorage
      localStorage.setItem('token', token);

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

