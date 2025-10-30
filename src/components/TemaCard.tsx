import React from 'react';

interface TemaCardProps {
  nome: string;
  porcentagem: number;
  cor: 'red' | 'yellow' | 'green';
}

const TemaCard: React.FC<TemaCardProps> = ({ nome, porcentagem, cor }) => {
  // Configurar cores baseadas no tipo
  const getCorConfig = (cor: 'red' | 'yellow' | 'green') => {
    switch (cor) {
      case 'red':
        return {
          borderColor: 'border-accessible-error',
          textColor: 'text-accessible-error',
          bgGradient: 'conic-gradient(var(--color-error) 0deg, var(--color-error) ' + (porcentagem * 3.6) + 'deg, var(--color-border) ' + (porcentagem * 3.6) + 'deg 360deg)'
        };
      case 'yellow':
        return {
          borderColor: 'border-accessible-warning',
          textColor: 'text-accessible-warning',
          bgGradient: 'conic-gradient(var(--color-warning) 0deg, var(--color-warning) ' + (porcentagem * 3.6) + 'deg, var(--color-border) ' + (porcentagem * 3.6) + 'deg 360deg)'
        };
      case 'green':
        return {
          borderColor: 'border-accessible-success',
          textColor: 'text-accessible-success',
          bgGradient: 'conic-gradient(var(--color-success) 0deg, var(--color-success) ' + (porcentagem * 3.6) + 'deg, var(--color-border) ' + (porcentagem * 3.6) + 'deg 360deg)'
        };
    }
  };

  const corConfig = getCorConfig(cor);

  return (
    <div 
      className="flex flex-col items-center p-4 cursor-pointer hover:bg-accessible-bg-secondary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2"
      role="button"
      tabIndex={0}
      aria-label={`Tema ${nome}, ${porcentagem}% de conformidade`}
    >
      {/* Card circular com progresso */}
      <div className="relative">
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center border-4 bg-accessible-bg-secondary"
          style={{ background: corConfig.bgGradient }}
          role="progressbar"
          aria-valuenow={porcentagem}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso: ${porcentagem}%`}
        >
          {/* Círculo interno */}
          <div className="w-24 h-24 bg-accessible-bg-primary rounded-full flex items-center justify-center">
            <span className={`text-2xl font-bold ${corConfig.textColor}`}>
              {porcentagem}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Nome do tema */}
      <h3 className="mt-4 text-center text-accessible-text-primary font-medium text-sm max-w-32">
        {nome}
      </h3>
    </div>
  );
};

export default TemaCard;