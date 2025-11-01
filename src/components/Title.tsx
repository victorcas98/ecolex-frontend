import React from 'react';

interface TitleProps {
  title: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, className = '' }) => {
  return (
    <div className={`mx-2 border-b-2 border-accessible-accent pb-1 ${className}`}>
      <h1 className="text-3xl px-2 pt-2 font-semibold text-accessible-text-primary">
        {title}
      </h1>
    </div>
  );
};

export default Title;