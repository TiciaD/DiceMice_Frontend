import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='h-full'>
      <Navbar />
      <main className='overflow-y-auto h-[calc(100%_-_168px)]'>{children}</main>
      <Footer />
    </div>
  );
}
