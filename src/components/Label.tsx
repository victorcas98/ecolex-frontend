import React from 'react';

interface LabelProps {
  text?: string;
  children?: React.ReactNode;
  theme?: 'primary' | 'secondary';
  className?: string;
}

const Label: React.FC<LabelProps> = ({ 
  text, 
  children, 
  theme = 'primary',
  className = '' 
}) => {
  const themeClasses = {
    primary: 'text-gray-700 font-medium',
    secondary: 'text-blue-600 font-medium'
  };

  const content = text || children;

  return (
    <label className={`block text-sm mb-2 ${themeClasses[theme]} ${className}`}>
      {content}
    </label>
  );
};

export default Label;
