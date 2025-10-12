import { useState, useCallback } from 'react';
import { temasService } from '../services';
import type { Tema, CreateTemaData, UpdateTemaData } from '../services';

interface UseTemas {
  temas: Tema[];
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

  const getAllTemas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await temasService.getAll();
      setTemas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar temas');
      console.error('Erro ao buscar temas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSemLei = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await temasService.getSemLei();
      setTemas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar temas sem lei');
      console.error('Erro ao buscar temas sem lei:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTemaById = useCallback(async (id: string | number): Promise<Tema | null> => {
    try {
      setLoading(true);
      setError(null);
      const tema = await temasService.getById(id);
      return tema;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Erro ao buscar tema ${id}`);
      console.error(`Erro ao buscar tema ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTema = useCallback(async (temaData: CreateTemaData): Promise<Tema | null> => {
    try {
      setLoading(true);
      setError(null);
      const novoTema = await temasService.create(temaData);
      setTemas(prev => [...prev, novoTema]);
      return novoTema;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar tema');
      console.error('Erro ao criar tema:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTema = useCallback(async (id: string | number, temaData: UpdateTemaData): Promise<Tema | null> => {
    try {
      setLoading(true);
      setError(null);
      const temaAtualizado = await temasService.update(id, temaData);
      setTemas(prev => prev.map(t => (t.id === id ? temaAtualizado : t)));
      return temaAtualizado;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Erro ao atualizar tema ${id}`);
      console.error(`Erro ao atualizar tema ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTema = useCallback(async (id: string | number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const sucesso = await temasService.delete(id);
      if (sucesso) setTemas(prev => prev.filter(t => t.id !== id));
      return sucesso;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Erro ao deletar tema ${id}`);
      console.error(`Erro ao deletar tema ${id}:`, err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    temas,
    loading,
    error,
    getAllTemas,
    getSemLei,
    getTemaById,
    createTema,
    updateTema,
    deleteTema,
    clearError,
  };
};
