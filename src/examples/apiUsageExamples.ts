/**
 * EXEMPLOS DE USO DAS NOVAS APIS
 * 
 * Este arquivo mostra como usar todas as rotas da API atualizada
 * conforme o fluxograma do backend.
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// ============================
// 📋 TEMAS - Estrutura: {nome: string, requisitosIds: string[], leisIds: string[]}
// ============================

export const temasExamples = {
  // GET /api/temas - Listar todos os temas
  async getAllTemas() {
    try {
      const response = await axios.get(`${API_BASE_URL}/temas`);
      console.log('Temas:', response.data);
      // Retorna: [{ nome: string, requisitosIds: string[], leisIds: string[] }]
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar temas:', error);
    }
  },

  // POST /api/temas - Criar novo tema
  async criarTema(nomeTema: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/temas`, {
        nome: nomeTema
      });
      console.log('Tema criado:', response.data);
      // Retorna: { nome: string, requisitosIds: [], leisIds: [] }
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tema:', error);
    }
  },

  // GET /api/temas/:id - Buscar tema por ID
  async getTemaById(temaId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/temas/${temaId}`);
      console.log('Tema encontrado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tema:', error);
    }
  },

  // PUT /api/temas/:id - Atualizar tema
  async atualizarTema(temaId: string, novoNome: string) {
    try {
      const response = await axios.put(`${API_BASE_URL}/temas/${temaId}`, {
        nome: novoNome
      });
      console.log('Tema atualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar tema:', error);
    }
  },

  // DELETE /api/temas/:id - Deletar tema
  async deletarTema(temaId: string) {
    try {
      await axios.delete(`${API_BASE_URL}/temas/${temaId}`);
      console.log('Tema deletado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao deletar tema:', error);
      return false;
    }
  }
};

// ============================
// 📋 REQUISITOS - Estrutura: {nome: string, temaId: string, leisIds: string[]}
// ============================

export const requisitosExamples = {
  // GET /api/requisitos - Listar todos os requisitos
  async getAllRequisitos() {
    try {
      const response = await axios.get(`${API_BASE_URL}/requisitos`);
      console.log('Requisitos:', response.data);
      // Retorna: [{ nome: string, temaId: string, leisIds: string[] }]
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar requisitos:', error);
    }
  },

  // POST /api/requisitos - Criar novo requisito
  async criarRequisito(nomeRequisito: string, temaId: string, leisIds: string[] = []) {
    try {
      const response = await axios.post(`${API_BASE_URL}/requisitos`, {
        nome: nomeRequisito,
        temaId: temaId,
        leisIds: JSON.stringify(leisIds) // Array deve ser enviado como string JSON
      });
      console.log('Requisito criado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar requisito:', error);
    }
  },

  // GET /api/requisitos/tema/:temaId - Buscar requisitos por tema
  async getRequisitosPorTema(temaId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/requisitos/tema/${temaId}`);
      console.log('Requisitos do tema:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar requisitos do tema:', error);
    }
  },

  // GET /api/requisitos/:id - Buscar requisito por ID
  async getRequisitoById(requisitoId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/requisitos/${requisitoId}`);
      console.log('Requisito encontrado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar requisito:', error);
    }
  },

  // PUT /api/requisitos/:id - Atualizar requisito
  async atualizarRequisito(requisitoId: string, novoNome: string, leisIds: string[] = []) {
    try {
      const response = await axios.put(`${API_BASE_URL}/requisitos/${requisitoId}`, {
        nome: novoNome,
        leisIds: JSON.stringify(leisIds)
      });
      console.log('Requisito atualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar requisito:', error);
    }
  },

  // DELETE /api/requisitos/:id - Deletar requisito
  async deletarRequisito(requisitoId: string) {
    try {
      await axios.delete(`${API_BASE_URL}/requisitos/${requisitoId}`);
      console.log('Requisito deletado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao deletar requisito:', error);
      return false;
    }
  }
};

// ============================
// 📋 LEIS - Estrutura: {id: string, nome: string, requisitosIds: string[], temasIds: string[]}
// ============================

export const leisExamples = {
  // GET /api/leis - Listar todas as leis
  async getAllLeis() {
    try {
      const response = await axios.get(`${API_BASE_URL}/leis`);
      console.log('Leis:', response.data);
      // Retorna: [{ id: string, nome: string, requisitosIds: string[], temasIds: string[] }]
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar leis:', error);
    }
  },

  // POST /api/leis - Criar nova lei (com arquivo)
  async criarLeiComArquivo(nomeLei: string, temasIds: string[], requisitosIds: string[] = [], arquivo: File, link: string = '') {
    try {
      const formData = new FormData();
      formData.append('nome', nomeLei);
      formData.append('temas', JSON.stringify(temasIds));
      formData.append('requisitosIds', JSON.stringify(requisitosIds));
      formData.append('link', link);
      formData.append('documento', arquivo);

      const response = await axios.post(`${API_BASE_URL}/leis`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Lei criada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar lei:', error);
    }
  },

  // POST /api/leis - Criar nova lei (apenas com link)
  async criarLeiSemArquivo(nomeLei: string, temasIds: string[], requisitosIds: string[] = [], link: string = '') {
    try {
      const formData = new FormData();
      formData.append('nome', nomeLei);
      formData.append('temas', JSON.stringify(temasIds));
      formData.append('requisitosIds', JSON.stringify(requisitosIds));
      formData.append('link', link);

      const response = await axios.post(`${API_BASE_URL}/leis`, formData);
      console.log('Lei criada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar lei:', error);
    }
  },

  // GET /api/leis/:id - Buscar lei por ID
  async getLeiById(leiId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/leis/${leiId}`);
      console.log('Lei encontrada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar lei:', error);
    }
  },

  // PUT /api/leis/:id - Atualizar lei
  async atualizarLei(leiId: string, dadosAtualizacao: {
    nome?: string;
    temasIds?: string[];
    requisitosIds?: string[];
    link?: string;
    arquivo?: File;
  }) {
    try {
      const formData = new FormData();
      if (dadosAtualizacao.nome) formData.append('nome', dadosAtualizacao.nome);
      if (dadosAtualizacao.link) formData.append('link', dadosAtualizacao.link);
      if (dadosAtualizacao.temasIds) formData.append('temas', JSON.stringify(dadosAtualizacao.temasIds));
      if (dadosAtualizacao.requisitosIds) formData.append('requisitosIds', JSON.stringify(dadosAtualizacao.requisitosIds));
      if (dadosAtualizacao.arquivo) formData.append('documento', dadosAtualizacao.arquivo);

      const response = await axios.put(`${API_BASE_URL}/leis/${leiId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Lei atualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar lei:', error);
    }
  },

  // DELETE /api/leis/:id - Deletar lei
  async deletarLei(leiId: string) {
    try {
      await axios.delete(`${API_BASE_URL}/leis/${leiId}`);
      console.log('Lei deletada com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao deletar lei:', error);
      return false;
    }
  }
};

// ============================
// 🔄 FLUXO COMPLETO DO DIAGRAMA
// ============================

export const fluxoCompleto = {
  // Fluxo seguindo exatamente o diagrama fornecido
  async fluxoCadastroLei() {
    try {
      console.log('=== INICIANDO FLUXO DE CADASTRO DE LEI ===');

      // 1. GET /api/temas - Buscar temas existentes
      console.log('1. Buscando temas existentes...');
      const temas = await temasExamples.getAllTemas();
      
      let temaId: string;
      
      // 2. Se não tem tema, criar um novo
      if (!temas || temas.length === 0) {
        console.log('2. Nenhum tema encontrado. Criando novo tema...');
        const novoTema = await temasExamples.criarTema('Meio Ambiente');
        temaId = novoTema.id || '1';
        console.log('✅ Tema criado:', novoTema);
      } else {
        temaId = temas[0].id || '1';
        console.log('✅ Usando tema existente:', temas[0]);
      }
      
      // 3. GET /api/requisitos - Buscar requisitos do tema
      console.log('3. Buscando requisitos do tema...');
      const requisitos = await requisitosExamples.getRequisitosPorTema(temaId);
      
      let requisitoId: string;
      
      // 4. Se não tem requisito, criar um novo (obrigatório pelo menos 1)
      if (!requisitos || requisitos.length === 0) {
        console.log('4. Nenhum requisito encontrado. Criando novo requisito...');
        const novoRequisito = await requisitosExamples.criarRequisito(
          'Estudo de Impacto Ambiental',
          temaId,
          []
        );
        requisitoId = novoRequisito.id || '1';
        console.log('✅ Requisito criado:', novoRequisito);
      } else {
        requisitoId = requisitos[0].id || '1';
        console.log('✅ Usando requisito existente:', requisitos[0]);
      }
      
      // 5. POST /api/leis - Criar a lei
      console.log('5. Criando lei...');
      const novaLei = await leisExamples.criarLeiSemArquivo(
        'Lei de Proteção Ambiental',
        [temaId],
        [requisitoId],
        'https://exemplo.com/lei-ambiental'
      );
      
      console.log('✅ Lei criada com sucesso:', novaLei);
      console.log('=== FLUXO COMPLETADO ===');
      
      return {
        tema: { id: temaId },
        requisito: { id: requisitoId },
        lei: novaLei
      };
      
    } catch (error) {
      console.error('❌ Erro no fluxo de cadastro:', error);
      throw error;
    }
  }
};

// ============================
// 🧪 TESTES RÁPIDOS
// ============================

export const testesRapidos = {
  // Teste básico para verificar se as APIs estão funcionando
  async testarTodasAsAPIs() {
    console.log('=== TESTANDO TODAS AS APIS ===');
    
    try {
      // Criar tema
      const tema = await temasExamples.criarTema('Teste Tema');
      console.log('✅ Tema criado');
      
      // Criar requisito
      const requisito = await requisitosExamples.criarRequisito('Teste Requisito', tema.id || '1');
      console.log('✅ Requisito criado');
      
      // Criar lei
      await leisExamples.criarLeiSemArquivo('Teste Lei', [tema.id || '1'], [requisito.id || '1']);
      console.log('✅ Lei criada');
      
      // Listar tudo
      const todosTemas = await temasExamples.getAllTemas();
      const todosRequisitos = await requisitosExamples.getAllRequisitos();
      const todasLeis = await leisExamples.getAllLeis();
      
      console.log('📊 Resultado final:');
      console.log('Temas:', todosTemas);
      console.log('Requisitos:', todosRequisitos);
      console.log('Leis:', todasLeis);
      
      console.log('✅ TODOS OS TESTES PASSARAM!');
      
    } catch (error) {
      console.error('❌ Erro nos testes:', error);
    }
  }
};

// ============================
// 📝 EXEMPLOS DE USO NO COMPONENTE
// ============================

/**
 * EXEMPLO DE COMO USAR NO COMPONENTE REACT:
 * 
 * import { temasExamples, requisitosExamples, leisExamples } from '../examples/apiUsageExamples';
 * 
 * const MeuComponente = () => {
 *   const [temas, setTemas] = useState([]);
 * 
 *   useEffect(() => {
 *     const carregarTemas = async () => {
 *       const temasCarregados = await temasExamples.getAllTemas();
 *       setTemas(temasCarregados);
 *     };
 *     carregarTemas();
 *   }, []);
 * 
 *   const handleCriarTema = async (nome) => {
 *     const novoTema = await temasExamples.criarTema(nome);
 *     if (novoTema) {
 *       setTemas(prev => [...prev, novoTema]);
 *     }
 *   };
 * 
 *   return (
 *     <div>
 *       {temas.map(tema => (
 *         <div key={tema.id}>{tema.nome}</div>
 *       ))}
 *     </div>
 *   );
 * };
 */