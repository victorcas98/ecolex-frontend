import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Label from "../../components/LAbel";
import TextInput from "../../components/TextInput";
import Title from "../../components/Title";
import ExpandableSection from "../../components/ExpandableSection";
import RequisitoItem from "../../components/RequisitoItem";
import { useProjetos } from "../../hooks/useProjetos";
import { useTemas, useRequisitos } from "../../hooks";
import type { Requisito } from "../../services/requisitosService";

interface RequisitoStatus {
  [requisitoId: string]: 'sim' | 'nao' | null;
}

interface TemasStatus {
  [temaId: string]: RequisitoStatus;
}

interface RequisitosPorTema {
  [temaId: string]: Requisito[];
}

const CadastroProjeto: React.FC = () => {
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [temasStatus, setTemasStatus] = useState<TemasStatus>({});
  const [temasCarregados, setTemasCarregados] = useState<Set<string>>(new Set());
  const [requisitosPorTema, setRequisitosPorTema] = useState<RequisitosPorTema>({});

  // Hooks
  const { createProjeto, loading, clearError } = useProjetos();
  const { temas, getAllTemas } = useTemas();
  const { requisitos, getByTema } = useRequisitos();

  // Carregar temas ao montar o componente
  useEffect(() => {
    getAllTemas();
  }, [getAllTemas]);

  // Função para carregar requisitos de um tema específico
  const carregarRequisitos = async (temaId: string) => {
    if (!temasCarregados.has(temaId)) {
      await getByTema(temaId);
      setTemasCarregados(prev => new Set([...prev, temaId]));
    }
  };

  // Atualizar requisitosPorTema quando requisitos do hook mudam
  useEffect(() => {
    // Quando requisitos são carregados, salvamos localmente por tema
    // Este effect roda após cada carregamento de requisitos
    const ultimoTemaCarregado = Array.from(temasCarregados).pop();
    if (ultimoTemaCarregado && requisitos.length > 0) {
      setRequisitosPorTema(prev => ({
        ...prev,
        [ultimoTemaCarregado]: requisitos
      }));
    }
  }, [requisitos, temasCarregados]);

  const handleRequisitoChange = (
    temaId: string,
    requisitoId: string,
    novoStatus: 'sim' | 'nao' | null
  ) => {
    setTemasStatus(prev => ({
      ...prev,
      [temaId]: {
        ...prev[temaId],
        [requisitoId]: novoStatus
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      clearError();
      
      if (!nomeProjeto.trim()) {
        alert("Nome do projeto é obrigatório");
        return;
      }

      // Construir a estrutura completa do projeto com temas e requisitos
      const temasCompletos = temas.map(tema => {
        const temaId = String(tema.id);
        const statusDoTema = temasStatus[temaId] || {};
        
        // Usar os requisitos salvos localmente para este tema
        const requisitosDoTema = requisitosPorTema[temaId] || [];
        
        // Filtrar apenas requisitos marcados como "sim"
        const requisitosCompletos = requisitosDoTema
          .filter(requisito => statusDoTema[String(requisito.id)] === 'sim')
          .map(requisito => ({
            id: String(requisito.id), // ID do requisito
            nome: requisito.nome,
            status: 'nao', // Todos começam com status "nao"
            evidencia: '', // String vazia inicialmente
            anexo: [], // Array vazio de arquivos (até 3)
            leisIds: tema.leisIds || [] // leisIds vem do tema, não do requisito individual
          }));

        return {
          nome: tema.nome,
          requisitos: requisitosCompletos
        };
      });

      const projetoCompleto = {
        nome: nomeProjeto,
        temas: temasCompletos
      };

      console.log("Dados completos do projeto:", projetoCompleto);

      const novoProjeto = await createProjeto(projetoCompleto);

      if (novoProjeto) {
        // Resetar formulário
        setNomeProjeto("");
        setTemasStatus({});
        setTemasCarregados(new Set());
        setRequisitosPorTema({});
        
        alert("Projeto criado com sucesso!");
      }
    } catch (err) {
      console.error("Erro no submit:", err);
    }
  };

  const renderRequisitos = (temaId: string) => {
    const statusDoTema = temasStatus[temaId] || {};
    const requisitosDoTema = requisitosPorTema[temaId] || [];

    if (requisitosDoTema.length === 0 || !temasCarregados.has(temaId)) {
      return <div className="text-gray-500 text-sm">Nenhum requisito encontrado para este tema</div>;
    }

    return (
      <div className="space-y-2">
        {requisitosDoTema.map((requisito) => (
          <RequisitoItem
            key={requisito.id}
            nome={requisito.nome}
            status={statusDoTema[String(requisito.id)] || null}
            onChange={(novoStatus) => handleRequisitoChange(temaId, String(requisito.id), novoStatus)}
            disabled={loading}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-screen">
      <div className="space-y-6">
        {/* Cabeçalho */}
        <Title title="Novo projeto" />
        
        {/* Formulário */}
        <div className="space-y-4 px-8">
          {/* Nome do Projeto */}
          <div className="space-y-2">
            <Label text="Nome do projeto" />
            <TextInput
              value={nomeProjeto}
              onChange={setNomeProjeto}
              placeholder="Digite o nome do projeto"
            />
          </div>

          {/* Seção Formulário */}
          <div className="space-y-2">
            <Label text="Formulário" />
          </div>

          {/* Temas dinâmicos */}
          {temas.map((tema) => (
            <ExpandableSection 
              key={tema.id}
              title={tema.nome}
              onExpand={() => carregarRequisitos(String(tema.id))}
            >
              {renderRequisitos(String(tema.id))}
            </ExpandableSection>
          ))}

          {temas.length === 0 && (
            <div className="text-gray-500 text-center py-4">
              Nenhum tema encontrado. <Link to="/legislacao" className="text-blue-500 hover:text-blue-700 underline">Crie temas primeiro na seção de Legislação.</Link>
            </div>
          )}
          
          {/* Botão Salvar */}
          <div className="py-6 w-full flex justify-center">
            <Button
              disabled={loading || temas.length === 0 || nomeProjeto.length < 3}
              className="w-[40%]"
              onClick={handleSubmit}
            >
              {loading ? "Criando..." : "Criar Projeto"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroProjeto;