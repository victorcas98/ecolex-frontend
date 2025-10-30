import React, { useId } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
  autoComplete?: string;
  ariaDescribedBy?: string;
}

const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  type = 'text',
  autoComplete,
  ariaDescribedBy
}) => {
  const inputId = useId();
  const errorId = useId();
  const hasError = !!error;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-accessible-text-primary font-medium mb-1"
        >
          {label}
          {required && (
            <span className="text-accessible-error ml-1" aria-label="obrigatório">
              *
            </span>
          )}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={hasError}
        aria-describedby={
          [hasError ? errorId : '', ariaDescribedBy]
            .filter(Boolean)
            .join(' ') || undefined
        }
        className={`input-field w-full ${
          hasError 
            ? 'border-accessible-error focus:border-accessible-error focus:ring-red-200' 
            : 'border-accessible-border focus:border-accessible-focus focus:ring-blue-200'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      />
      
      {hasError && (
        <p 
          id={errorId}
          className="mt-1 text-sm text-accessible-error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;