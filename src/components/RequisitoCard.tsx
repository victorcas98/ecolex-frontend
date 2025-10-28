import React, { useState } from 'react';
import type { RequisitoStatus } from '../types/projeto';

interface RequisitoCardProps {
  requisito: RequisitoStatus;
  onRegistrarEvidencia: (requisito: RequisitoStatus) => void;
}

const RequisitoCard: React.FC<RequisitoCardProps> = ({ requisito, onRegistrarEvidencia }) => {
  const [expandido, setExpandido] = useState(false);

  // Determinar cor e ícone baseado no status
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'concluido':
        return {
          borderColor: 'border-green-500',
          bgColor: 'bg-green-50',
          textColor: 'text-green-600',
          icon: '✓',
          statusText: 'Concluído'
        };
      case 'pendente':
        return {
          borderColor: 'border-yellow-500',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-600',
          icon: '⏳',
          statusText: 'Pendente'
        };
      default:
        return {
          borderColor: 'border-gray-500',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          icon: '?',
          statusText: 'Desconhecido'
        };
    }
  };

  const statusConfig = getStatusConfig(requisito.status);

  return (
    <div className={`border-2 rounded-lg ${statusConfig.borderColor} ${statusConfig.bgColor}`}>
      {/* Header do card */}
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setExpandido(!expandido)}
      >
        <div className="flex items-center space-x-3">
          <span className={`text-xl ${statusConfig.textColor}`}>
            {statusConfig.icon}
          </span>
          <div>
            <h3 className="font-medium text-gray-800">{requisito.nome}</h3>
            <p className={`text-sm ${statusConfig.textColor}`}>
              {statusConfig.statusText}
            </p>
          </div>
        </div>
        
        <button className="text-gray-400 hover:text-gray-600">
          <span className={`transform transition-transform ${expandido ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {/* Conteúdo expandido */}
      {expandido && (
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seção Evidências */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">Evidências</h4>
                <span className={`text-sm ${requisito.evidencia ? 'text-green-600' : 'text-red-600'}`}>
                  {requisito.evidencia ? 'Cadastrada' : 'Pendente'}
                </span>
              </div>
              
              {requisito.evidencia ? (
                <div className="text-sm text-gray-600 mb-3">
                  {requisito.evidencia}
                </div>
              ) : (
                <div className="text-sm text-gray-500 mb-3">
                  Nenhuma evidência registrada
                </div>
              )}

              <button
                onClick={() => onRegistrarEvidencia(requisito)}
                className="text-gray-500 underline hover:text-gray-700 text-sm"
              >
                Registrar nova
              </button>
            </div>

            {/* Seção Planos de Ação */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">Planos de ação</h4>
              </div>
              
              <div className="space-y-2">
                {/* TODO: Implementar planos de ação quando disponível no backend */}
                <div className="flex items-center justify-between text-sm">
                  <span>• Plano 01</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>• Plano 02</span>
                </div>
              </div>

              <button className="text-gray-500 underline hover:text-gray-700 text-sm mt-3">
                Registrar nova
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequisitoCard;