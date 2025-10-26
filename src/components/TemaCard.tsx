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
          borderColor: 'border-custom-red',
          textColor: 'text-custom-red',
          bgGradient: 'conic-gradient(#ef4444 0deg, #ef4444 ' + (porcentagem * 3.6) + 'deg, #e5e7eb ' + (porcentagem * 3.6) + 'deg 360deg)'
        };
      case 'yellow':
        return {
          borderColor: 'border-custom-yellow',
          textColor: 'text-custom-yellow',
          bgGradient: 'conic-gradient(#eab308 0deg, #eab308 ' + (porcentagem * 3.6) + 'deg, #e5e7eb ' + (porcentagem * 3.6) + 'deg 360deg)'
        };
      case 'green':
        return {
          borderColor: 'border-custom-green',
          textColor: 'text-custom-green',
          bgGradient: 'conic-gradient(#22c55e 0deg, #22c55e ' + (porcentagem * 3.6) + 'deg, #e5e7eb ' + (porcentagem * 3.6) + 'deg 360deg)'
        };
    }
  };

  const corConfig = getCorConfig(cor);

  return (
    <div className="flex flex-col items-center p-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
      {/* Card circular com progresso */}
      <div className="relative">
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center border-4 bg-gray-100"
          style={{ background: corConfig.bgGradient }}
        >
          {/* Círculo interno branco */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <span className={`text-2xl font-bold ${corConfig.textColor}`}>
              {porcentagem}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Nome do tema */}
      <h3 className="mt-4 text-center text-gray-700 font-medium text-sm max-w-32">
        {nome}
      </h3>
    </div>
  );
};

export default TemaCard;