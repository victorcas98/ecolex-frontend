import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  theme?: 'primary' | 'secundary' 
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  children,
  className = '',
  theme
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 text-custom-light-blue rounded-md transition-all duration-200 ${
        disabled
          ? 'bg-custom-grey cursor-default'
          : theme === 'primary'
          ? 'bg-custom-green hover:bg-green-600 cursor-pointer'
          : 'bg-custom-blue hover:bg-blue-600 cursor-pointer'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;