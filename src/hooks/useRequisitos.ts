import { useState, useCallback } from 'react';
import requisitosService from '../services/requisitosService';
import type { Requisito } from '../services/requisitosService';
import { useAppContext } from '../contexts/AppContext';

interface UseRequisitos {
  requisitos: Requisito[];
  loading: boolean;
  getByTema: (temaId: string | number) => Promise<void>;
  createRequisito: (data: { descricao: string; temaId: string | number }) => Promise<Requisito | null>;
  updateRequisito: (id: string | number, descricao: string) => Promise<Requisito | null>;
  deleteRequisito: (id: string | number) => Promise<boolean>;
  clearError: () => void;
}

export const useRequisitos = (): UseRequisitos => {
  const [requisitos, setRequisitos] = useState<Requisito[]>([]);
  const [loading, setLoading] = useState(false);
  // errors/success are surfaced via AppContext modals
  const { showError, showSuccess } = useAppContext();

  const clearError = useCallback(() => {/* no-op: AppContext manages modals */}, []);

  const getByTema = useCallback(async (temaId: string | number) => {
    try {
      setLoading(true);
      const data = await requisitosService.getByTemaId(temaId);
      setRequisitos(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar requisitos';
      console.error('Erro ao buscar requisitos:', err);
      showError(message);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const createRequisito = useCallback(async (data: { descricao: string; temaId: string | number }) => {
    try {
      setLoading(true);
      const novo = await requisitosService.create(data);
      setRequisitos(prev => [...prev, novo]);
      showSuccess('Requisito criado com sucesso');
      return novo;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar requisito';
      console.error('Erro ao criar requisito:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  const updateRequisito = useCallback(async (id: string | number, descricao: string) => {
    try {
      setLoading(true);
      const atualizado = await requisitosService.update(id, descricao);
      setRequisitos(prev => prev.map(r => (r.id === id ? atualizado : r)));
      showSuccess('Requisito atualizado');
      return atualizado;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao atualizar requisito';
      console.error('Erro ao atualizar requisito:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  const deleteRequisito = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      const sucesso = await requisitosService.delete(id);
      if (sucesso) {
        setRequisitos(prev => prev.filter(r => r.id !== id));
        showSuccess('Requisito removido');
      }
      return sucesso;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao deletar requisito';
      console.error('Erro ao deletar requisito:', err);
      showError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  return {
    requisitos,
    loading,
    getByTema,
    createRequisito,
    updateRequisito,
    deleteRequisito,
    clearError,
  };
};

export default useRequisitos;
