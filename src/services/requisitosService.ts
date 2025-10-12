import axios from 'axios';
import { API_BASE_URL } from './api';

export interface Requisito {
  id: number | string;
  descricao: string;
  temaId: number | string;
}

const requisitosService = {
  create: async (data: { descricao: string; temaId: number | string }): Promise<Requisito> => {
    const response = await axios.post(`${API_BASE_URL}/requisitos`, data);
    return response.data;
  },
  getByTemaId: async (temaId: number | string): Promise<Requisito[]> => {
    const response = await axios.get(`${API_BASE_URL}/requisitos/tema/${temaId}`);
    return response.data;
  },
  getAll: async (): Promise<Requisito[]> => {
    const response = await axios.get(`${API_BASE_URL}/requisitos`);
    return response.data;
  },
  getById: async (id: number | string): Promise<Requisito> => {
    const response = await axios.get(`${API_BASE_URL}/requisitos/${id}`);
    return response.data;
  },
  update: async (id: number | string, descricao: string): Promise<Requisito> => {
    const response = await axios.put(`${API_BASE_URL}/requisitos/${id}`, { descricao });
    return response.data;
  },
  delete: async (id: number | string): Promise<boolean> => {
    await axios.delete(`${API_BASE_URL}/requisitos/${id}`);
    return true;
  },
};

export default requisitosService;
