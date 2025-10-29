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

  // POST /api/projetos/:id/temas/:temaId/requisitos - Adicionar requisito
  adicionarRequisito: async (
    projetoId: string, 
    temaId: string, 
    requisito: { nome: string; status?: string; leisIds?: string[] }
  ): Promise<Projeto> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/projetos/${projetoId}/temas/${temaId}/requisitos`,
        requisito
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar requisito:', error);
      throw error;
    }
  },

  // PUT /api/projetos/:id/temas/:temaId/requisitos/:requisitoId - Atualizar requisito
  atualizarRequisito: async (
    projetoId: string,
    temaId: string,
    requisitoId: string,
    updates: { status?: string; leisIds?: string[]; dataValidade?: string }
  ): Promise<Projeto> => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/projetos/${projetoId}/temas/${temaId}/requisitos/${requisitoId}`,
        updates
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar requisito:', error);
      throw error;
    }
  },

  // PUT /api/projetos/:id/temas/:temaId/requisitos/:requisitoId/evidencia - Salvar evidência
  salvarEvidencia: async (
    projetoId: string,
    temaId: string,
    requisitoId: string,
    evidenciaData: { evidencia: string; data?: string; anexos: File[] }
  ): Promise<Projeto> => {
    try {
      const formData = new FormData();
      formData.append('evidencia', evidenciaData.evidencia);
      if (evidenciaData.data) {
        formData.append('data', evidenciaData.data);
      }
      evidenciaData.anexos.forEach((arquivo) => {
        formData.append('anexo', arquivo);
      });

      const response = await axios.post(
        `${API_BASE_URL}/projetos/${projetoId}/temas/${temaId}/requisitos/${requisitoId}/evidencias`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar evidência:', error);
      throw error;
    }
  },

  // PUT /api/projetos/:id/temas/:temaId/requisitos/:requisitoId/status - Atualizar status
  atualizarStatusRequisito: async (
    projetoId: string,
    temaId: string,
    requisitoId: string,
    novoStatus: string
  ): Promise<Projeto> => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/projetos/${projetoId}/temas/${temaId}/requisitos/${requisitoId}`,
        { status: novoStatus }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar status do requisito:', error);
      throw error;
    }
  },

  // DELETE /api/projetos/:id/temas/:temaId/requisitos/:requisitoId - Remover requisito
  removerRequisito: async (
    projetoId: string,
    temaId: string,
    requisitoId: string
  ): Promise<Projeto> => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/projetos/${projetoId}/temas/${temaId}/requisitos/${requisitoId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao remover requisito:', error);
      throw error;
    }
  },

  // PUT /api/projetos/:id/editar-completo - Editar projeto completo
  editarCompleto: async (
    id: string, 
    projetoCompleto: { 
      nome: string; 
      temas: Array<{
        tema: string;
        requisitos: Array<{
          requisito: string;
          status: string;
          leis: string[];
          evidencia?: string;
          dataEvidencia?: string;
          anexos?: string[];
        }>;
      }>;
    }
  ): Promise<Projeto> => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/projetos/${id}/editar-completo`,
        projetoCompleto,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao editar projeto completo:', error);
      throw error;
    }
  }
};

export default projetosService;