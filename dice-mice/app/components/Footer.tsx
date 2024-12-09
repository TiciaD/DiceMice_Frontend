import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-7xl px-6 py-8 md:flex md:items-center md:justify-between lg:px-8'>
        <div className='flex justify-center gap-x-6 md:order-2'>
          <a target='_blank' href='https://icons8.com/icon/YXM3JzkEKZjv/dice'>
            Dice
          </a>{' '}
          icon by{' '}
          <a target='_blank' href='https://icons8.com'>
            Icons8
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
