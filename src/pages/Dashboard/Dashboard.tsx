import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import TemaCard from '../../components/TemaCard';
import Button from '../../components/Button';
import { useProjetos } from '../../hooks/useProjetos';
import { useProjetoStats } from '../../hooks/useProjetoStats';
import { useExportPDF } from '../../hooks/useExportPDF';

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projeto, getProjetoById, loading } = useProjetos();
  const { temas } = useProjetoStats(projeto);
  const { exportProjectSummary } = useExportPDF();
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (id) {
      getProjetoById(id);
    }
  }, [id, getProjetoById]);

  const handleTemaClick = (temaNome: string) => {
    navigate(`/dashboard/${id}/detalhes?tema=${encodeURIComponent(temaNome)}`);
  };

  const handleExportPDF = async () => {
    if (!projeto) return;
    
    setIsExporting(true);
    try {
      const result = await exportProjectSummary(projeto, {
        includeEvidence: true,
        includeStats: true,
      });
      
      if (result.success) {
        console.log('PDF gerado com sucesso:', result.fileName);
      } else {
        console.error('Erro ao gerar PDF');
      }
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-accessible-text-secondary">Carregando projeto...</p>
      </div>
    );
  }

  if (!projeto) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-accessible-text-secondary">Projeto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <div className="px-8 pt-4 flex justify-between items-center">
        <Title title={projeto.nome} />
        <Button
          onClick={handleExportPDF}
          disabled={isExporting || !projeto}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? 'Gerando PDF...' : '📄 Exportar Resumo (PDF)'}
        </Button>
      </div>
      
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
            <p className="text-accessible-text-secondary">Este projeto não possui temas configurados.</p>
            <p className="text-accessible-text-secondary text-sm mt-2">
              Adicione temas ao projeto para visualizar o progresso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;