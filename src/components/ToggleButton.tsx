import React from 'react';

interface ToggleButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ 
  selected, 
  onClick, 
  children,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 border border-accessible-accent rounded-md transition-all duration-accessible min-h-touch ${
        selected 
          ? 'bg-accessible-accent text-white' 
          : 'bg-accessible-bg-primary text-accessible-accent hover:bg-accessible-bg-secondary'
      } focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 ${className}`}
      role="switch"
      aria-pressed={selected}
    >
      {children}
    </button>
  );
};

export default ToggleButton;