"use client"

import React from 'react'

const Page = () => {
  const handleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL + '/auth/login';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>You have been logged out</h1>
      <p>Your session has expired. Please log back in to continue.</p>
      <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Log In
      </button>
    </div>
  );
}

export default Page