import React from 'react';

interface LabelProps {
  text?: string;
  children?: React.ReactNode;
  theme?: 'primary' | 'secondary';
  className?: string;
  htmlFor?: string;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ 
  text, 
  children, 
  theme = 'primary',
  className = '',
  htmlFor,
  required = false
}) => {
  const themeClasses = {
    primary: 'text-accessible-text-primary font-medium',
    secondary: 'text-accessible-accent font-medium'
  };

  const content = text || children;

  return (
    <label 
      className={`block text-sm mb-2 ${themeClasses[theme]} ${className}`}
      htmlFor={htmlFor}
    >
      {content}
      {required && (
        <span className="text-accessible-error ml-1" aria-label="obrigatório">
          *
        </span>
      )}
    </label>
  );
};

export default Label;
