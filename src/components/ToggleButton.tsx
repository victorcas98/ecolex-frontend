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
      className={`px-3 py-1 border border-custom-green rounded-md  rounded-md transition-all duration-200 ${
        selected 
          ? 'bg-custom-green text-custom-light-blue' 
          : 'bg-custom-light-blue text-custom-green'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default ToggleButton;