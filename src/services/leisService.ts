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
  documento?: File | null | undefined;
  temas: number[] | string[];
}

export interface UpdateLeiData {
  nome?: string;
  link?: string;
  documento?: File | null | undefined;
  temas?: number[] | string[];
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
  create: async (leiData: CreateLeiData | FormData): Promise<Lei> => {
    try {
      let payload: FormData;
      if (leiData instanceof FormData) {
        payload = leiData;
      } else {
        payload = new FormData();
        payload.append('nome', leiData.nome);
        payload.append('link', leiData.link || '');
        if (leiData.documento) payload.append('documento', leiData.documento);
        if (leiData.temas) payload.append('temas', JSON.stringify(leiData.temas));
      }

      const response = await axios.post(`${API_BASE_URL}/leis`, payload, {
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
  update: async (id: string, leiData: UpdateLeiData | FormData): Promise<Lei> => {
    try {
      if (leiData instanceof FormData) {
        const response = await axios.put(`${API_BASE_URL}/leis/${id}`, leiData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      }

      // leiData is UpdateLeiData
      if (leiData.documento || leiData.temas) {
        const fd = new FormData();
        if (leiData.nome) fd.append('nome', leiData.nome);
        if (leiData.link) fd.append('link', leiData.link);
        if (leiData.documento) fd.append('documento', leiData.documento);
        if (leiData.temas) fd.append('temas', JSON.stringify(leiData.temas));

        const response = await axios.put(`${API_BASE_URL}/leis/${id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      }

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
