'use client';

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';

const Callback = () => {
  const searchParams = useSearchParams()

  const token = searchParams.get('token');
  const refreshToken = searchParams.get('refreshToken');

  if (token && refreshToken) {
    // Save tokens to localStorage (or cookies if preferred)
    localStorage.setItem('token', token as string);
    localStorage.setItem('refreshToken', refreshToken as string);
  }

  return <Suspense><p>Redirecting...</p></Suspense>;
};

export default Callback;
