import React from "react";
import Button from "./Button";

interface RequisitoItemProps {
  nome: string;
  selecionado: boolean; // ✅ true = incluir no projeto, false = não incluir
  onChange: (selecionado: boolean) => void;
  disabled?: boolean;
}

const RequisitoItem: React.FC<RequisitoItemProps> = ({
  nome,
  selecionado = false,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-accessible-bg-secondary rounded-md border border-accessible-border">
      <span className="text-sm text-accessible-text-primary flex-1">{nome}</span>
      
      <div className="flex space-x-2 ml-4">
        <Button
          theme={selecionado ? 'primary' : 'transparent'}
          onClick={() => onChange(!selecionado)}
          disabled={disabled}
          className="px-3 py-1 text-sm min-w-[50px]"
          ariaLabel={`${selecionado ? 'Remover' : 'Incluir'} requisito ${nome}`}
        >
          {selecionado ? '✓ Incluir' : 'Incluir'}
        </Button>
      </div>
    </div>
  );
};

export default RequisitoItem;