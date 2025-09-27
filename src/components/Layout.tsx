import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Layout: React.FC = () => {
  return (
    <div>
      <Navigation />
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;