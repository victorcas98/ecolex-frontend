import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import TemaCard from '../../components/TemaCard';
import { useProjetos } from '../../hooks/useProjetos';
import { useProjetoStats } from '../../hooks/useProjetoStats';

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projeto, getProjetoById, loading } = useProjetos();
  const { temas } = useProjetoStats(projeto);

  useEffect(() => {
    if (id) {
      getProjetoById(id);
    }
  }, [id, getProjetoById]);

  const handleTemaClick = (temaNome: string) => {
    navigate(`/dashboard/${id}/detalhes?tema=${encodeURIComponent(temaNome)}`);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando projeto...</p>
      </div>
    );
  }

  if (!projeto) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Projeto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Title title={projeto.nome} />
      
      <div className="p-8">
        {/* Grid de cards dos temas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {temas.map((tema, index) => (
            <div key={index} onClick={() => handleTemaClick(tema.nome)}>
              <TemaCard
                nome={tema.nome}
                porcentagem={tema.porcentagem}
                cor={tema.cor}
              />
            </div>
          ))}
        </div>

        {temas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Este projeto não possui temas configurados.</p>
            <p className="text-gray-400 text-sm mt-2">
              Adicione temas ao projeto para visualizar o progresso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;