import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

const Layout: React.FC = () => {
  return (
    <div className='flex flex-row bg-custom-light-blue text-custom-black'>
      <Navigation />
      <main className='w-full h-screen overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;