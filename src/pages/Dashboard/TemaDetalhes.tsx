import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Title from '../../components/Title';
import EvidenciaModal from '../../components/EvidenciaModal';
import { useProjetos } from '../../hooks/useProjetos';
import type { RequisitoStatus } from '../../types/projeto';

// Componente RequisitoCard inline
interface RequisitoCardProps {
  requisito: RequisitoStatus;
  onRegistrarEvidencia: (requisito: RequisitoStatus) => void;
}

const RequisitoCard: React.FC<RequisitoCardProps> = ({ requisito, onRegistrarEvidencia }) => {
  const [expandido, setExpandido] = useState(false);

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
          borderColor: 'border-red-500',
          bgColor: 'bg-red-50',
          textColor: 'text-red-600',
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

      {expandido && (
        <div className="border-t border-gray-200 p-4 bg-white">
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
              {requisito.evidencia ? 'Editar' : 'Registrar nova'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TemaDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const temaNome = searchParams.get('tema');
  const { projeto, getProjetoById, loading, salvarEvidencia } = useProjetos();
  const [modalAberto, setModalAberto] = useState(false);
  const [requisitoSelecionado, setRequisitoSelecionado] = useState<RequisitoStatus | null>(null);

  useEffect(() => {
    if (id) {
      getProjetoById(id);
    }
  }, [id, getProjetoById]);

  const tema = projeto?.temas.find(t => t.nome === temaNome);
  const requisitos = tema?.requisitos || [];

  // Calcular porcentagem do tema
  const calcularPorcentagem = () => {
    if (requisitos.length === 0) return 0;
    const requisitosConcluidos = requisitos.filter(req => req.status === 'concluido').length;
    return Math.round((requisitosConcluidos / requisitos.length) * 100);
  };

  const handleRegistrarEvidencia = (requisito: RequisitoStatus) => {
    setRequisitoSelecionado(requisito);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setRequisitoSelecionado(null);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando detalhes...</p>
      </div>
    );
  }

  if (!projeto || !tema) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Tema não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      {/* Header com título e porcentagem */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <Title title={projeto.nome} />
        <div className="flex items-center justify-between px-8 mt-4">
          <h2 className="text-2xl font-medium text-gray-700">{temaNome}</h2>
          <span className="text-3xl font-bold text-yellow-600">{calcularPorcentagem()}%</span>
        </div>
      </div>

      {/* Lista de requisitos */}
      <div className="px-8 space-y-4">
        {requisitos.map((requisito, index) => (
          <RequisitoCard
            key={index}
            requisito={requisito}
            onRegistrarEvidencia={handleRegistrarEvidencia}
          />
        ))}

        {requisitos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Este tema não possui requisitos.</p>
          </div>
        )}
      </div>

      {/* Modal de evidência */}
      {modalAberto && requisitoSelecionado && (
        <EvidenciaModal
          requisito={requisitoSelecionado}
          onClose={handleFecharModal}
          onSave={async (evidencia: string, data: string, anexos: File[]) => {
            if (id && tema?.id) {
              const sucesso = await salvarEvidencia(id, tema.id, requisitoSelecionado.id, {
                evidencia,
                data,
                anexos
              });
              
              if (sucesso) {
                handleFecharModal();
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default TemaDetalhes;