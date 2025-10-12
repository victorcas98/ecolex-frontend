import { useState, useCallback } from 'react';
import { leisService } from '../services';
import type { Lei, CreateLeiData, UpdateLeiData } from '../services';

interface UseLeis {
  // Estados
  leis: Lei[];
  loading: boolean;
  error: string | null;
  
  // Operações
  getAllLeis: () => Promise<void>;
  getLeiById: (id: string) => Promise<Lei | null>;
  createLei: (leiData: CreateLeiData) => Promise<Lei | null>;
  updateLei: (id: string, leiData: UpdateLeiData) => Promise<Lei | null>;
  deleteLei: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export const useLeis = (): UseLeis => {
  const [leis, setLeis] = useState<Lei[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getAllLeis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leisService.getAll();
      setLeis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar leis');
      console.error('Erro ao buscar leis:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getLeiById = useCallback(async (id: string): Promise<Lei | null> => {
    try {
      setLoading(true);
      setError(null);
      const lei = await leisService.getById(id);
      return lei;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Erro ao buscar lei ${id}`);
      console.error(`Erro ao buscar lei ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createLei = useCallback(async (leiData: CreateLeiData): Promise<Lei | null> => {
    try {
      setLoading(true);
      setError(null);
      const novaLei = await leisService.create(leiData);
      
      // Atualiza a lista local de leis
      setLeis(prev => [...prev, novaLei]);
      
      return novaLei;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar lei');
      console.error('Erro ao criar lei:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLei = useCallback(async (id: string, leiData: UpdateLeiData): Promise<Lei | null> => {
    try {
      setLoading(true);
      setError(null);
      const leiAtualizada = await leisService.update(id, leiData);
      
      // Atualiza a lista local de leis
      setLeis(prev => prev.map(lei => 
        lei.id === id ? leiAtualizada : lei
      ));
      
      return leiAtualizada;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Erro ao atualizar lei ${id}`);
      console.error(`Erro ao atualizar lei ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLei = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const sucesso = await leisService.delete(id);
      
      if (sucesso) {
        // Remove da lista local de leis
        setLeis(prev => prev.filter(lei => lei.id !== id));
      }
      
      return sucesso;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Erro ao deletar lei ${id}`);
      console.error(`Erro ao deletar lei ${id}:`, err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // Estados
    leis,
    loading,
    error,
    
    // Operações
    getAllLeis,
    getLeiById,
    createLei,
    updateLei,
    deleteLei,
    clearError,
  };
};