import axios from 'axios';
import { API_BASE_URL } from './api';
import type { Projeto, CreateProjetoData, UpdateProjetoData } from '../types/projeto';

const projetosService = {
  // GET /api/projetos - Listar todos os projetos
  getAll: async (): Promise<Projeto[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projetos`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      throw error;
    }
  },

  // GET /api/projetos/:id - Buscar projeto por ID
  getById: async (id: string): Promise<Projeto> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projetos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar projeto ${id}:`, error);
      throw error;
    }
  },

  // POST /api/projetos - Criar novo projeto
  create: async (projetoData: CreateProjetoData): Promise<Projeto> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projetos`, projetoData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  },

  // PUT /api/projetos/:id - Atualizar projeto
  update: async (id: string, projetoData: UpdateProjetoData): Promise<Projeto> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/projetos/${id}`, projetoData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar projeto ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/projetos/:id - Deletar projeto
  delete: async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`${API_BASE_URL}/projetos/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar projeto ${id}:`, error);
      throw error;
    }
  },

  // POST /api/projetos/:id/temas - Vincular tema ao projeto
  vincularTema: async (projetoId: string, temaId: string): Promise<Projeto> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projetos/${projetoId}/temas`, {
        temaId
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao vincular tema:', error);
      throw error;
    }
  },

  // POST /api/projetos/:id/temas/:temaNome/requisitos - Adicionar requisito
  adicionarRequisito: async (
    projetoId: string, 
    temaNome: string, 
    requisito: { nome: string; status?: string; leisIds?: string[] }
  ): Promise<Projeto> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/projetos/${projetoId}/temas/${encodeURIComponent(temaNome)}/requisitos`,
        requisito
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar requisito:', error);
      throw error;
    }
  },

  // PUT /api/projetos/:id/temas/:temaNome/requisitos/:requisitoNome - Atualizar requisito
  atualizarRequisito: async (
    projetoId: string,
    temaNome: string,
    requisitoNome: string,
    updates: { status?: string; leisIds?: string[] }
  ): Promise<Projeto> => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/projetos/${projetoId}/temas/${encodeURIComponent(temaNome)}/requisitos/${encodeURIComponent(requisitoNome)}`,
        updates
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar requisito:', error);
      throw error;
    }
  }
};

export default projetosService;