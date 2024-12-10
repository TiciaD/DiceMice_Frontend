'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const CallbackContent = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const refreshToken = searchParams.get('refreshToken');

  if (token && refreshToken) {
    // Save tokens to localStorage (or cookies if preferred)
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

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

