import React from 'react';

interface TitleProps {
  title: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, className = '' }) => {
  return (
    <div className={`mx-2 border-b-2 border-custom-green pb-1 ${className}`}>
      <h1 className="text-3xl px-2 pt-2 font-semibold text-custom-black">
        {title}
      </h1>
    </div>
  );
};

export default Title;