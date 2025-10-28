import { useState, useCallback } from 'react';
import projetosService from '../services/projetosService';
import type { Projeto, CreateProjetoData, UpdateProjetoData } from '../types/projeto';
import { useAppContext } from '../contexts/AppContext';

interface UseProjetos {
  projetos: Projeto[];
  projeto: Projeto | null; // Projeto individual
  loading: boolean;
  error: string | null;
  
  getAllProjetos: () => Promise<void>;
  getProjetoById: (id: string) => Promise<void>;
  createProjeto: (projetoData: CreateProjetoData) => Promise<Projeto | null>;
  updateProjeto: (id: string, projetoData: UpdateProjetoData) => Promise<Projeto | null>;
  deleteProjeto: (id: string) => Promise<boolean>;
  vincularTema: (projetoId: string, temaId: string) => Promise<Projeto | null>;
  adicionarRequisito: (projetoId: string, temaId: string, requisito: { nome: string; status?: string; leisIds?: string[] }) => Promise<Projeto | null>;
  atualizarRequisito: (projetoId: string, temaId: string, requisitoId: string, updates: { status?: string; leisIds?: string[]; dataValidade?: string }) => Promise<Projeto | null>;
  salvarEvidencia: (projetoId: string, temaId: string, requisitoId: string, evidenciaData: { evidencia: string; anexos: File[] }) => Promise<Projeto | null>;
  atualizarStatusRequisito: (projetoId: string, temaId: string, requisitoId: string, novoStatus: string) => Promise<Projeto | null>;
  removerRequisito: (projetoId: string, temaId: string, requisitoId: string) => Promise<Projeto | null>;
  editarCompleto: (id: string, projetoCompleto: { nome: string; temas: Array<{ tema: string; requisitos: Array<{ requisito: string; status: string; leis: string[]; evidencia?: string; dataEvidencia?: string; anexos?: string[]; }>; }>; }) => Promise<Projeto | null>;
  clearError: () => void;
}

export const useProjetos = (): UseProjetos => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showError, showSuccess } = useAppContext();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getAllProjetos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projetosService.getAll();
      setProjetos(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar projetos';
      setError(message);
      console.error('Erro ao buscar projetos:', err);
      showError(message);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const getProjetoById = useCallback(async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const projetoData = await projetosService.getById(id);
      setProjeto(projetoData);
    } catch (err) {
      const message = err instanceof Error ? err.message : `Erro ao buscar projeto ${id}`;
      setError(message);
      console.error(`Erro ao buscar projeto ${id}:`, err);
      showError(message);
      setProjeto(null);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const createProjeto = useCallback(async (projetoData: CreateProjetoData): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const novoProjeto = await projetosService.create(projetoData);
      setProjetos(prev => [...prev, novoProjeto]);
      showSuccess('Projeto criado com sucesso');
      return novoProjeto;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar projeto';
      setError(message);
      console.error('Erro ao criar projeto:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  const updateProjeto = useCallback(async (id: string, projetoData: UpdateProjetoData): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const projetoAtualizado = await projetosService.update(id, projetoData);
      setProjetos(prev => prev.map(projeto => 
        projeto.id === id ? projetoAtualizado : projeto
      ));
      showSuccess('Projeto atualizado');
      return projetoAtualizado;
    } catch (err) {
      const message = err instanceof Error ? err.message : `Erro ao atualizar projeto ${id}`;
      setError(message);
      console.error(`Erro ao atualizar projeto ${id}:`, err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  const deleteProjeto = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const sucesso = await projetosService.delete(id);
      if (sucesso) {
        setProjetos(prev => prev.filter(projeto => projeto.id !== id));
        showSuccess('Projeto removido');
      }
      return sucesso;
    } catch (err) {
      const message = err instanceof Error ? err.message : `Erro ao deletar projeto ${id}`;
      setError(message);
      console.error(`Erro ao deletar projeto ${id}:`, err);
      showError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  const vincularTema = useCallback(async (projetoId: string, temaId: string): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const projetoAtualizado = await projetosService.vincularTema(projetoId, temaId);
      setProjetos(prev => prev.map(projeto => 
        projeto.id === projetoId ? projetoAtualizado : projeto
      ));
      showSuccess('Tema vinculado com sucesso');
      return projetoAtualizado;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao vincular tema';
      setError(message);
      console.error('Erro ao vincular tema:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  const adicionarRequisito = useCallback(async (projetoId: string, temaId: string, requisito: { nome: string; status?: string; leisIds?: string[] }): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const projetoAtualizado = await projetosService.adicionarRequisito(projetoId, temaId, requisito);
      setProjetos(prev => prev.map(projeto => 
        projeto.id === projetoId ? projetoAtualizado : projeto
      ));
      showSuccess('Requisito adicionado com sucesso');
      return projetoAtualizado;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao adicionar requisito';
      setError(message);
      console.error('Erro ao adicionar requisito:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  const atualizarRequisito = useCallback(async (projetoId: string, temaId: string, requisitoId: string, updates: { status?: string; leisIds?: string[] }): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const projetoAtualizado = await projetosService.atualizarRequisito(projetoId, temaId, requisitoId, updates);
      setProjetos(prev => prev.map(projeto => 
        projeto.id === projetoId ? projetoAtualizado : projeto
      ));
      // Atualizar também o projeto individual se estiver carregado
      if (projeto && projeto.id === projetoId) {
        setProjeto(projetoAtualizado);
      }
      showSuccess('Requisito atualizado');
      return projetoAtualizado;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao atualizar requisito';
      setError(message);
      console.error('Erro ao atualizar requisito:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess, projeto]);

  const salvarEvidencia = useCallback(
    async (
      projetoId: string,
      temaId: string,
      requisitoId: string,
      evidenciaData: { evidencia: string; anexos: File[] }
    ): Promise<Projeto | null> => {
      try {
        setLoading(true);
        setError(null);
        // Enviar os campos esperados pela API: registro e anexos
        const { evidencia, anexos } = evidenciaData;
        const projetoAtualizado = await projetosService.salvarEvidencia(
          projetoId,
          temaId,
          requisitoId,
          { registro: evidencia, anexos }
        );
        // Atualizar status para 'concluido' após registrar evidência
        await projetosService.atualizarStatusRequisito(projetoId, temaId, requisitoId, 'concluido');
        // Buscar novamente o projeto para atualizar o estado e as cores dos cards
        await getProjetoById(projetoId);
        showSuccess('Evidência salva com sucesso');
        return projetoAtualizado;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao salvar evidência';
        setError(message);
        console.error('Erro ao salvar evidência:', err);
        showError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [showError, showSuccess, projeto]
  );

  const atualizarStatusRequisito = useCallback(async (projetoId: string, temaId: string, requisitoId: string, novoStatus: string): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const projetoAtualizado = await projetosService.atualizarStatusRequisito(projetoId, temaId, requisitoId, novoStatus);
      setProjetos(prev => prev.map(projeto => 
        projeto.id === projetoId ? projetoAtualizado : projeto
      ));
      // Atualizar também o projeto individual se estiver carregado
      if (projeto && projeto.id === projetoId) {
        setProjeto(projetoAtualizado);
      }
      showSuccess('Status do requisito atualizado');
      return projetoAtualizado;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao atualizar status do requisito';
      setError(message);
      console.error('Erro ao atualizar status do requisito:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess, projeto]);

  const removerRequisito = useCallback(async (projetoId: string, temaId: string, requisitoId: string): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const projetoAtualizado = await projetosService.removerRequisito(projetoId, temaId, requisitoId);
      setProjetos(prev => prev.map(projeto => 
        projeto.id === projetoId ? projetoAtualizado : projeto
      ));
      // Atualizar também o projeto individual se estiver carregado
      if (projeto && projeto.id === projetoId) {
        setProjeto(projetoAtualizado);
      }
      showSuccess('Requisito removido com sucesso');
      return projetoAtualizado;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao remover requisito';
      setError(message);
      console.error('Erro ao remover requisito:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess, projeto]);

  const editarCompleto = useCallback(async (id: string, projetoCompleto: { nome: string; temas: Array<{ tema: string; requisitos: Array<{ requisito: string; status: string; leis: string[]; evidencia?: string; dataEvidencia?: string; anexos?: string[]; }>; }>; }): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const projetoAtualizado = await projetosService.editarCompleto(id, projetoCompleto);
      setProjetos(prev => prev.map(projeto => 
        projeto.id === id ? projetoAtualizado : projeto
      ));
      // Atualizar também o projeto individual se estiver carregado
      if (projeto && projeto.id === id) {
        setProjeto(projetoAtualizado);
      }
      showSuccess('Projeto editado completamente');
      return projetoAtualizado;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao editar projeto completo';
      setError(message);
      console.error('Erro ao editar projeto completo:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess, projeto]);

  return {
    projetos,
    projeto,
    loading,
    error,
    getAllProjetos,
    getProjetoById,
    createProjeto,
    updateProjeto,
    deleteProjeto,
    vincularTema,
    adicionarRequisito,
    atualizarRequisito,
    salvarEvidencia,
    atualizarStatusRequisito,
    removerRequisito,
    editarCompleto,
    clearError,
  };
};