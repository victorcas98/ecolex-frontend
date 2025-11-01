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
    <li>
      <Link 
        to={destiny}
        className={`flex items-center p-3 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-accessible font-medium min-h-touch focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 ${
          isActive 
            ? 'text-black bg-white bg-opacity-30 font-semibold' 
            : 'text-black hover:text-black hover:bg-opacity-15'
        }`}
        aria-label={ariaLabel || label}
        aria-current={isActive ? 'page' : undefined}
        accessKey={accessKey}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <span>{label}</span>
        {accessKey && (
          <span className="ml-auto text-xs text-black font-semibold">
            Alt+{accessKey.toUpperCase()}
          </span>
        )}
      </Link>
    </li>
  );
};

export default NavigationItem;