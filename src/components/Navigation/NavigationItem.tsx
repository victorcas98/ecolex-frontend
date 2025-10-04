import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItemProps {
  label: string;
  destiny: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ label, destiny }) => {
  const location = useLocation();
  const isActive = location.pathname === destiny;

  return (
    <li>
      <Link 
        to={destiny}
        className={`flex items-center p-3 hover:text-custom-grey rounded-lg transition-all duration-200 font-medium ${
          isActive 
            ? 'text-custom-green' 
            : 'text-custom-blue'
        }`}
      >
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default NavigationItem;