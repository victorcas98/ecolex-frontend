import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjetos } from '../../hooks/useProjetos';
import { useTemas } from '../../hooks/useTemas';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Label from '../../components/Label';
import Title from '../../components/Title';

interface RequisitoForm {
  requisito: string;
  status: string;
  leis: string[];
  evidencia?: string;
  dataEvidencia?: string;
  anexos?: string[];
}

interface TemaForm {
  tema: string;
  requisitos: RequisitoForm[];
}

interface ProjetoForm {
  nome: string;
  temas: TemaForm[];
}

export const EditarProjeto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projeto, getProjetoById, editarCompleto, loading } = useProjetos();
  const { temas, getAllTemas } = useTemas();
  
  const [projetoForm, setProjetoForm] = useState<ProjetoForm>({
    nome: '',
    temas: []
  });

  useEffect(() => {
    if (id) {
      getProjetoById(id);
    }
    getAllTemas();
  }, [id, getProjetoById, getAllTemas]);

  useEffect(() => {
    if (projeto) {
      setProjetoForm({
        nome: projeto.nome,
        temas: projeto.temas.map(tema => ({
          tema: tema.nome,
          requisitos: tema.requisitos.map(req => ({
            requisito: req.nome,
            status: req.status,
            leis: req.leisIds || [],
            evidencia: req.evidencia,
            dataEvidencia: req.evidencia, // Usando evidencia como data também
            anexos: req.anexo ? req.anexo.map(() => '') : [] // Convertendo File[] para string[]
          }))
        }))
      });
    }
  }, [projeto]);

  const handleNomeChange = (value: string) => {
    setProjetoForm(prev => ({ ...prev, nome: value }));
  };

  const adicionarTema = (temaNome: string) => {
    const temaExistente = temas.find(t => t.nome === temaNome);
    if (!temaExistente) return;

    const novoTema: TemaForm = {
      tema: temaNome,
      requisitos: [] // Inicialmente vazio, requisitos podem ser adicionados depois
    };

    setProjetoForm(prev => ({
      ...prev,
      temas: [...prev.temas, novoTema]
    }));
  };

  const removerTema = (temaIndex: number) => {
    setProjetoForm(prev => ({
      ...prev,
      temas: prev.temas.filter((_, index) => index !== temaIndex)
    }));
  };

  const atualizarStatusRequisito = (temaIndex: number, requisitoIndex: number, novoStatus: string) => {
    setProjetoForm(prev => ({
      ...prev,
      temas: prev.temas.map((tema, ti) => 
        ti === temaIndex ? {
          ...tema,
          requisitos: tema.requisitos.map((req, ri) => 
            ri === requisitoIndex ? { ...req, status: novoStatus } : req
          )
        } : tema
      )
    }));
  };

  const salvarProjeto = async () => {
    if (!id) return;
    
    const resultado = await editarCompleto(id, projetoForm);
    if (resultado) {
      navigate(`/dashboard/${id}`);
    }
  };

  const temasDisponiveis = temas.filter(tema => 
    !projetoForm.temas.some(t => t.tema === tema.nome)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Carregando projeto...</div>
      </div>
    );
  }

  if (!projeto) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-accessible-error">Projeto não encontrado</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Title title="Editar Projeto" />
        
        <div className="space-y-6">
          {/* Nome do Projeto */}
          <div>
            <Label>Nome do Projeto</Label>
            <TextInput
              value={projetoForm.nome}
              onChange={handleNomeChange}
              placeholder="Digite o nome do projeto"
            />
          </div>

          {/* Temas Selecionados */}
          <div>
            <Label>Temas do Projeto</Label>
            <div className="space-y-4">
              {projetoForm.temas.map((tema, temaIndex) => (
                <div key={temaIndex} className="border rounded-lg p-4 bg-accessible-bg-secondary border-accessible-border">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-accessible-text-primary">{tema.tema}</h3>
                    <Button
                      theme="transparent"
                      onClick={() => removerTema(temaIndex)}
                      className="text-accessible-error border-accessible-error hover:bg-red-50"
                      ariaLabel={`Remover tema ${tema.tema}`}
                    >
                      Remover Tema
                    </Button>
                  </div>
                  
                  {/* Requisitos do Tema */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-accessible-text-primary">Requisitos:</h4>
                    {tema.requisitos.map((requisito, requisitoIndex) => (
                      <div key={requisitoIndex} className="flex items-center justify-between p-2 bg-accessible-bg-primary rounded border border-accessible-border">
                        <span className="flex-1 text-accessible-text-primary">{requisito.requisito}</span>
                        <label htmlFor={`status-${temaIndex}-${requisitoIndex}`} className="sr-only">
                          Status do requisito: {requisito.requisito}
                        </label>
                        <select
                          id={`status-${temaIndex}-${requisitoIndex}`}
                          value={requisito.status}
                          onChange={(e) => atualizarStatusRequisito(temaIndex, requisitoIndex, e.target.value)}
                          className="ml-4 px-3 py-1 border rounded text-accessible-text-primary bg-accessible-bg-primary border-accessible-border focus:border-accessible-focus focus:outline-none focus:ring-2 focus:ring-accessible-focus"
                          aria-label={`Status do requisito: ${requisito.requisito}`}
                        >
                          <option value="pendente">⏳ Pendente</option>
                          <option value="concluido">✅ Concluído</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adicionar Novos Temas */}
          {temasDisponiveis.length > 0 && (
            <div>
              <Label>Adicionar Temas</Label>
              <div className="flex flex-wrap gap-2">
                {temasDisponiveis.map(tema => (
                  <Button
                    key={tema.id}
                    theme="transparent"
                    onClick={() => adicionarTema(tema.nome)}
                    className="text-sm"
                  >
                    + {tema.nome}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex gap-4 pt-6">
            <Button onClick={salvarProjeto} disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
            <Button
              theme="transparent"
              onClick={() => navigate(`/dashboard/${id}`)}
            >
              Cancelar
            </Button>
          </div>
        </div>
    </div>
  );
};