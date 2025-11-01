// Tipos para projetos baseados no backend
export interface Projeto {
  id: string;
  nome: string;
  temas: TemaProjeto[];
}

export interface TemaProjeto {
  id: string;
  nome: string;
  requisitos: RequisitoStatus[];
}

export interface Anexo {
  nome: string;
  caminho: string;
  data: string;
}

export interface RequisitoStatus {
  id: string;
  nome: string;
  status: 'pendente' | 'concluido'; // ✅ Apenas status válidos
  evidencia: string; // apenas uma string
  dataValidade?: string; // data de validade da evidência
  anexo: Anexo[]; // array de anexos salvos
  leisIds: string[];
}

export interface CreateProjetoData {
  nome: string;
  temas: {
    nome: string;
    requisitos: {
      id: string;
      nome: string;
      status: 'pendente' | 'concluido';
      evidencia: string;
      anexo: File[];
      leisIds: string[];
    }[];
  }[];
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

// Interface para seleção de requisitos no cadastro (Sim/Não = será incluído ou não)
export interface RequisitoFormulario {
  id: string;
  nome: string;
  selecionado: boolean; // true = incluir no projeto, false = não incluir
}

// Dados fixos dos formulários conforme a imagem
export const FORMULARIOS_DATA: FormularioData = {
  conservacaoBiodiversidade: [
    { id: 'cb1', nome: 'Conservação da Biodiversidade', selecionado: false }
  ],
  relacoesTrabalhistsa: [
    { id: 'rt1', nome: 'Relações Trabalhistas', selecionado: false }
  ],
  saudeSegurancaTrabalho: [
    { id: 'st1', nome: 'Expor Trabalhadores à Periculosidade', selecionado: false },
    { id: 'st2', nome: 'Realizar Atividade de mecanografia (datilogtafia, escrituração)', selecionado: false },
    { id: 'st3', nome: 'Expor Trabalhadores a atividades insalubres, ainda que dentro dos limites de tolerância', selecionado: false },
    { id: 'st4', nome: 'Expor Trabalhadores a agentes químicos', selecionado: false },
    { id: 'st5', nome: 'Expor Trabalhadores a radiação ionizante', selecionado: false },
    { id: 'st6', nome: 'Expor Trabalhadores a ruído ocupacional', selecionado: false },
    { id: 'st7', nome: 'Expor Trabalhadores a substâncias e/ou produtos nocivos', selecionado: false },
    { id: 'st8', nome: 'Expor Trabalhadores a agentes ambientes', selecionado: false }
  ]
};
