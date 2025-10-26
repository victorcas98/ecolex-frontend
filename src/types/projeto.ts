// Tipos para projetos baseados no backend
export interface Projeto {
  id: string;
  nome: string;
  temas: TemaProjeto[];
}

export interface TemaProjeto {
  nome: string;
  requisitos: RequisitoStatus[];
}

export interface RequisitoStatus {
  id: string;
  nome: string;
  status: string;
  evidencia: string; // apenas uma string
  anexo: File[]; // array de arquivos (até 3)
  leisIds: string[];
}

export interface CreateProjetoData {
  nome: string;
  temas: TemaProjeto[];
}

export interface UpdateProjetoData {
  nome?: string;
}

// Dados dos formulários fixos baseados na imagem
export interface FormularioData {
  conservacaoBiodiversidade: RequisitoFormulario[];
  relacoesTrabalhistsa: RequisitoFormulario[];
  saudeSegurancaTrabalho: RequisitoFormulario[];
}

export interface RequisitoFormulario {
  id: string;
  nome: string;
  status: 'sim' | 'nao' | null;
}

// Dados fixos dos formulários conforme a imagem
export const FORMULARIOS_DATA: FormularioData = {
  conservacaoBiodiversidade: [
    { id: 'cb1', nome: 'Conservação da Biodiversidade', status: null }
  ],
  relacoesTrabalhistsa: [
    { id: 'rt1', nome: 'Relações Trabalhistas', status: null }
  ],
  saudeSegurancaTrabalho: [
    { id: 'st1', nome: 'Expor Trabalhadores à Periculosidade', status: null },
    { id: 'st2', nome: 'Realizar Atividade de mecanografia (datilogtafia, escrituração)', status: null },
    { id: 'st3', nome: 'Expor Trabalhadores a atividades insalubres, ainda que dentro dos limites de tolerância', status: null },
    { id: 'st4', nome: 'Expor Trabalhadores a agentes químicos', status: null },
    { id: 'st5', nome: 'Expor Trabalhadores a radiação ionizante', status: null },
    { id: 'st6', nome: 'Expor Trabalhadores a ruído ocupacional', status: null },
    { id: 'st7', nome: 'Expor Trabalhadores a substâncias e/ou produtos nocivos', status: null },
    { id: 'st8', nome: 'Expor Trabalhadores a agentes ambientes', status: null }
  ]
};
