import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  placeholder,
}) => {
  return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-1 bg-custom-white border border-custom-blue rounded-md focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent"
      />
  );
};

export default TextInput;