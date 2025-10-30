import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  theme?: 'primary' | 'secondary' | 'transparent'; 
  ariaLabel?: string;
  ariaDescribedBy?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  children,
  className = '',
  theme = 'primary',
  ariaLabel,
  ariaDescribedBy,
  type = 'button',
  loading = false
}) => {

 const ButtonTheme = {
  primary: "text-white bg-accessible-accent hover:bg-accessible-accent-hover focus:ring-accessible-focus",
  secondary: "text-white bg-custom-blue hover:bg-blue-600 focus:ring-accessible-focus",
  transparent: "text-accessible-accent bg-transparent hover:bg-accessible-bg-secondary border border-accessible-accent focus:ring-accessible-focus"
};

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled && !loading) {
        onClick();
      }
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={isDisabled}
      className={`px-4 py-2 rounded-md transition-all duration-accessible font-medium min-h-touch min-w-touch
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
        ${isDisabled
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
          : ButtonTheme[theme]
        } ${loading ? 'loading' : ''} ${className}`}
    >
      {loading ? (
        <>
          <span className="sr-only">Carregando...</span>
          <span aria-hidden="true">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;