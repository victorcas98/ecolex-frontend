import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
  label: string;
  destiny: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ label, destiny }) => {
  return (
    
        <li>
          <Link 
            to={destiny}
            className="flex items-center p-3 text-custom-blue hover:bg-white hover:text-custom-black rounded-lg transition-all duration-200 font-medium"
          >
            <span>{label}</span>
          </Link>
        </li>
        
  );
};

export default NavigationItem;