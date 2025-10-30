import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItemProps {
  label: string;
  destiny: string;
  ariaLabel?: string;
  accessKey?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  label, 
  destiny, 
  ariaLabel, 
  accessKey 
}) => {
  const location = useLocation();
  const isActive = location.pathname === destiny;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Enter ou Space ativam o link
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // O Link do React Router já cuida da navegação
    }
  };

  return (
    <li role="none">
      <Link 
        to={destiny}
        className={`flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-accessible font-medium min-h-touch focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
          isActive 
            ? 'text-white bg-white bg-opacity-20' 
            : 'text-white hover:text-gray-200'
        }`}
        role="menuitem"
        aria-label={ariaLabel || label}
        aria-current={isActive ? 'page' : undefined}
        accessKey={accessKey}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <span>{label}</span>
        {accessKey && (
          <span className="ml-auto text-xs opacity-70">
            Alt+{accessKey.toUpperCase()}
          </span>
        )}
      </Link>
    </li>
  );
};

export default NavigationItem;