import axios from 'axios';
import { API_BASE_URL } from './api';

export interface Requisito {
  id?: number | string;
  nome: string;
  temaId: string;
  leisIds: string[];
}

const requisitosService = {
  create: async (data: { nome: string; temaId: string; leisIds?: string[] }): Promise<Requisito> => {
    const payload = {
      nome: data.nome,
      temaId: data.temaId,
      leisIds: data.leisIds
    };
    const response = await axios.post(`${API_BASE_URL}/requisitos`, payload);
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
  update: async (id: number | string, data: { nome: string; leisIds?: string[] }): Promise<Requisito> => {
    const payload = {
      nome: data.nome,
      leisIds: JSON.stringify(data.leisIds || [])
    };
    const response = await axios.put(`${API_BASE_URL}/requisitos/${id}`, payload);
    return response.data;
  },
  delete: async (id: number | string): Promise<boolean> => {
    await axios.delete(`${API_BASE_URL}/requisitos/${id}`);
    return true;
  },
};

export default requisitosService;
