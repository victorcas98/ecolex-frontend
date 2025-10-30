import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Title from '../../components/Title';
import EvidenciaModal from '../../components/EvidenciaModal';
import { useProjetos } from '../../hooks/useProjetos';
import type { RequisitoStatus } from '../../types/projeto';
import RequisitoCard from '../../components/RequisitoCard';


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
        <p className="text-accessible-text-secondary">Carregando detalhes...</p>
      </div>
    );
  }

  if (!projeto || !tema) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-accessible-text-secondary">Tema não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      {/* Header com título e porcentagem */}
      <div className="border-b-2 border-accessible-border pb-4 mb-6">
        <Title title={projeto.nome} />
        <div className="flex items-center justify-between px-8 mt-4">
          <h2 className="text-2xl font-medium text-accessible-text-primary">{temaNome}</h2>
          <span className="text-3xl font-bold text-accessible-warning" aria-label={`${calcularPorcentagem()}% de progresso`}>
            {calcularPorcentagem()}%
          </span>
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
            <p className="text-accessible-text-secondary">Este tema não possui requisitos.</p>
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