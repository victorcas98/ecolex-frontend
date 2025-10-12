import axios from 'axios';
import { API_BASE_URL } from './api';

// Tipos para tema (opcionalmente usar interfaces reais conforme backend)
import type { Lei } from './leisService';

export interface Requisito {
  id: number | string;
  descricao: string;
  temaId: number | string;
}

export interface Tema {
  id: string | number;
  nome: string;
  // ids of linked laws (updated by backend)
  leisIds?: number[];
  // optional expanded relations returned by backend
  leis?: Lei[];
  requisitos?: Requisito[];
}

export interface CreateTemaData {
  nome: string;
}

export interface UpdateTemaData {
  nome?: string;
}

const temasService = {
  // GET /api/temas - Listar TODOS os temas com requisitos
  getAll: async (): Promise<Tema[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/temas`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar temas:', error);
      throw error;
    }
  },

  // GET /api/temas/:id - Buscar tema específico com requisitos
  getById: async (id: string | number): Promise<Tema> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/temas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar tema ${id}:`, error);
      throw error;
    }
  },

  // GET /api/temas/lei/:leiId - Listar temas de uma lei específica
  getByLeiId: async (leiId: string | number): Promise<Tema[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/temas/lei/${leiId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar temas da lei ${leiId}:`, error);
      throw error;
    }
  },

  // GET /api/temas/sem-lei - Listar temas sem lei associada
  getSemLei: async (): Promise<Tema[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/temas/sem-lei`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar temas sem lei:', error);
      throw error;
    }
  },

  // POST /api/temas - Criar novo tema vinculado a uma lei
  create: async (temaData: CreateTemaData): Promise<Tema> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/temas`, {
        nome: temaData.nome,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tema:', error);
      throw error;
    }
  },

  // PUT /api/temas/:id - Atualizar tema
  update: async (id: string | number, temaData: UpdateTemaData): Promise<Tema> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/temas/${id}`, {
        nome: temaData.nome,
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar tema ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/temas/:id - Deletar tema (remove requisitos relacionados)
  delete: async (id: string | number): Promise<boolean> => {
    try {
      await axios.delete(`${API_BASE_URL}/temas/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar tema ${id}:`, error);
      throw error;
    }
  },
};

export default temasService;
