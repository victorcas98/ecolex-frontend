import { useState, useCallback } from 'react';
import { temasService } from '../services';
import type { Tema, CreateTemaData, UpdateTemaData } from '../services';
import { useAppContext } from '../contexts/AppContext';

interface UseTemas {
  temas: Tema[];
  setTemas: React.Dispatch<React.SetStateAction<Tema[]>>;
  loading: boolean;
  error: string | null;

  getAllTemas: () => Promise<void>;
  getSemLei: () => Promise<void>;
  getTemaById: (id: string | number) => Promise<Tema | null>;
  createTema: (temaData: CreateTemaData) => Promise<Tema | null>;
  updateTema: (id: string | number, temaData: UpdateTemaData) => Promise<Tema | null>;
  deleteTema: (id: string | number) => Promise<boolean>;
  clearError: () => void;
}

export const useTemas = (): UseTemas => {
  const [temas, setTemas] = useState<Tema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);
  const { showError, showSuccess } = useAppContext();

  const getAllTemas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await temasService.getAll();
      setTemas(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar temas';
      setError(message);
      console.error('Erro ao buscar temas:', err);
      showError(message);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const getSemLei = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await temasService.getSemLei();
      setTemas(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar temas sem lei';
      setError(message);
      console.error('Erro ao buscar temas sem lei:', err);
      showError(message);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const getTemaById = useCallback(async (id: string | number): Promise<Tema | null> => {
    try {
      setLoading(true);
      setError(null);
      const tema = await temasService.getById(id);
      return tema;
    } catch (err) {
      const message = err instanceof Error ? err.message : `Erro ao buscar tema ${id}`;
      setError(message);
      console.error(`Erro ao buscar tema ${id}:`, err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const createTema = useCallback(async (temaData: CreateTemaData): Promise<Tema | null> => {
    try {
      setLoading(true);
      setError(null);
      const novoTema = await temasService.create(temaData);
      setTemas(prev => [...prev, novoTema]);
      showSuccess('Tema criado com sucesso');
      return novoTema;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar tema';
      setError(message);
      console.error('Erro ao criar tema:', err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  const updateTema = useCallback(async (id: string | number, temaData: UpdateTemaData): Promise<Tema | null> => {
    try {
      setLoading(true);
      setError(null);
      const temaAtualizado = await temasService.update(id, temaData);
      setTemas(prev => prev.map(t => (t.id === id ? temaAtualizado : t)));
      showSuccess('Tema atualizado');
      return temaAtualizado;
    } catch (err) {
      const message = err instanceof Error ? err.message : `Erro ao atualizar tema ${id}`;
      setError(message);
      console.error(`Erro ao atualizar tema ${id}:`, err);
      showError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  const deleteTema = useCallback(async (id: string | number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const sucesso = await temasService.delete(id);
      if (sucesso) setTemas(prev => prev.filter(t => t.id !== id));
      if (sucesso) showSuccess('Tema removido');
      return sucesso;
    } catch (err) {
      const message = err instanceof Error ? err.message : `Erro ao deletar tema ${id}`;
      setError(message);
      console.error(`Erro ao deletar tema ${id}:`, err);
      showError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  return {
    temas,
    loading,
    error,
    clearError,
    getAllTemas,
    getSemLei,
    getTemaById,
    createTema,
    updateTema,
    deleteTema,
    setTemas,
  };
};
