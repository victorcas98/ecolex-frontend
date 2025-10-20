import axios from 'axios';
import { API_BASE_URL } from './api';

// Tipos para a lei conforme nova API
export interface Lei {
  id: string;
  nome: string;
  requisitosIds: string[];
  temasIds: string[];
}

export interface CreateLeiData {
  nome: string;
  link?: string;
  documento?: File | null | undefined;
  temasIds: string[];
  requisitosIds?: string[];
}

export interface UpdateLeiData {
  nome?: string;
  link?: string;
  documento?: File | null | undefined;
  temasIds?: string[];
  requisitosIds?: string[];
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
        if (leiData.link && leiData.link.trim()) {
          // Adicionar http:// se não tiver protocolo
          const link = leiData.link.startsWith('http') ? leiData.link : `http://${leiData.link}`;
          payload.append('link', link);
        }
        if (leiData.documento) payload.append('documento', leiData.documento);
        payload.append('temas', JSON.stringify(leiData.temasIds));
      }

      // Log do payload que será enviado (útil para debug)
      console.log('Payload (FormData) entries:');
      for (const [key, value] of payload.entries()) {
        if (value instanceof File) {
          console.log(key, { name: value.name, type: value.type, size: value.size });
        } else {
          console.log(key, value);
        }
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
      if (leiData.documento || leiData.temasIds || leiData.requisitosIds) {
        const fd = new FormData();
        if (leiData.nome) fd.append('nome', leiData.nome);
        if (leiData.link) fd.append('link', leiData.link);
        if (leiData.documento) fd.append('documento', leiData.documento);
        if (leiData.temasIds) fd.append('temas', JSON.stringify(leiData.temasIds));
        if (leiData.requisitosIds) fd.append('requisitosIds', JSON.stringify(leiData.requisitosIds));

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
