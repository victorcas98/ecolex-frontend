import React from 'react';

interface LabelProps {
    text: string;
    theme?: 'primary' | 'secundary' 
}

const Label: React.FC<LabelProps> = ({
    text,
    theme = 'primary'
}) => {
    return (
        <label className={`text-lg font-medium ${theme === 'primary' ? 'text-custom-blue' : 'text-custom-black'}`}>
            {text}
        </label>
    );
};

export default Label;