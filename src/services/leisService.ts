import axios from 'axios';
import { API_BASE_URL } from './api';

// Tipos para a lei
export interface Lei {
  id: number | string;
  nome: string;
  link?: string;
  documento?: string | null;
  temas?: number[]; // ids
  temasDetalhes?: { id: number | string; nome: string }[]; // expanded temas
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeiData {
  nome: string;
  link?: string;
  documento?: File |null | undefined;
}

export interface UpdateLeiData {
  nome?: string;
  link?: string;
}

const leisService = {
  // GET /api/leis - Listar todas as leis
  getAll: async (): Promise<Lei[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/leis`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar leis:', error);
      throw error;
    }
  },

  // GET /api/leis/:id - Buscar lei por ID
  getById: async (id: string): Promise<Lei> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/leis/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar lei ${id}:`, error);
      throw error;
    }
  },

  // POST /api/leis - Criar nova lei (com upload de documento)
  create: async (leiData: CreateLeiData): Promise<Lei> => {
    try {
      const formData = new FormData();
      formData.append('nome', leiData.nome);
      formData.append('link', leiData.link || '');
      
      // Se tem arquivo, adiciona ao FormData
      if (leiData.documento) {
        formData.append('documento', leiData.documento);
      }

      const response = await axios.post(`${API_BASE_URL}/leis`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar lei:', error);
      throw error;
    }
  },

  // PUT /api/leis/:id - Atualizar lei
  update: async (id: string, leiData: UpdateLeiData): Promise<Lei> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/leis/${id}`, leiData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar lei ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/leis/:id - Deletar lei
  delete: async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`${API_BASE_URL}/leis/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar lei ${id}:`, error);
      throw error;
    }
  },
};

export default leisService;
