import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  theme?: 'primary' | 'secondary' | 'transparent'; 
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  children,
  className = '',
  theme = 'primary'
}) => {

 const ButtonTheme = {
  primary: "text-custom-light-blue bg-custom-green hover:bg-green-600 cursor-pointer",
  secondary: "text-custom-light-blue bg-custom-blue hover:bg-blue-600 cursor-pointer",
  transparent: "text-custom-green bg-transparent hover:bg-gray-100 cursor-pointer border border-custom-green"
};

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded-md transition-all duration-200 ${
        disabled
          ? 'bg-custom-grey cursor-default'
          : ButtonTheme[theme]
          } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;