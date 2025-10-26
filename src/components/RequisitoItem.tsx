import React from "react";
import Button from "./Button";

interface RequisitoItemProps {
  nome: string;
  status: 'sim' | 'nao' | null;
  onChange: (status: 'sim' | 'nao' | null) => void;
  disabled?: boolean;
}

const RequisitoItem: React.FC<RequisitoItemProps> = ({
  nome,
  status = 'nao',
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
      <span className="text-sm text-gray-700 flex-1">{nome}</span>
      
      <div className="flex space-x-2 ml-4">
        <Button
          theme={status === 'sim' ? 'primary' : 'transparent'}
          onClick={() => onChange(status === 'sim' ? null : 'sim')}
          disabled={disabled}
          className="px-3 py-1 text-sm min-w-[50px]"
        >
          Sim
        </Button>
        
        <Button
          theme={status === 'nao' ? 'primary' : 'transparent'}
          onClick={() => onChange(status === 'nao' ? null : 'nao')}
          disabled={disabled}
          className="px-3 py-1 text-sm min-w-[50px]"
        >
          Não
        </Button>
      </div>
    </div>
  );
};

export default RequisitoItem;