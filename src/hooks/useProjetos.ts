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
  adicionarRequisito: (projetoId: string, temaNome: string, requisito: { nome: string; status?: string; leisIds?: string[] }) => Promise<Projeto | null>;
  atualizarRequisito: (projetoId: string, temaNome: string, requisitoNome: string, updates: { status?: string; leisIds?: string[] }) => Promise<Projeto | null>;
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

  const adicionarRequisito = useCallback(async (projetoId: string, temaNome: string, requisito: { nome: string; status?: string; leisIds?: string[] }): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const projetoAtualizado = await projetosService.adicionarRequisito(projetoId, temaNome, requisito);
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

  const atualizarRequisito = useCallback(async (projetoId: string, temaNome: string, requisitoNome: string, updates: { status?: string; leisIds?: string[] }): Promise<Projeto | null> => {
    try {
      setLoading(true);
      setError(null);
      const projetoAtualizado = await projetosService.atualizarRequisito(projetoId, temaNome, requisitoNome, updates);
      setProjetos(prev => prev.map(projeto => 
        projeto.id === projetoId ? projetoAtualizado : projeto
      ));
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
  }, [showError, showSuccess]);

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
    clearError,
  };
};