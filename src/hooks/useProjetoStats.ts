import { useMemo } from 'react';
import type { Projeto } from '../types/projeto';

interface TemaStats {
  nome: string;
  porcentagem: number;
  cor: 'red' | 'yellow' | 'green';
}

interface ProjetoStats {
  temas: TemaStats[];
}

export const useProjetoStats = (projeto: Projeto | null): ProjetoStats => {
  return useMemo(() => {
    if (!projeto) {
      return { temas: [] };
    }

    const temasStats = projeto.temas.map((tema): TemaStats => {
      const totalRequisitos = tema.requisitos.length;
      
      if (totalRequisitos === 0) {
        return {
          nome: tema.nome,
          porcentagem: 0,
          cor: 'red'
        };
      }

      // Calcular pontuação baseada nos status
      // sim = 2 pontos, pendente = 1 ponto, não = 0 pontos
      const pontuacaoTotal = tema.requisitos.reduce((acc, requisito) => {
        switch (requisito.status) {
          case 'sim':
            return acc + 2;
          case 'pendente':
            return acc + 1;
          case 'não':
          case 'nao':
          default:
            return acc + 0;
        }
      }, 0);

      // Pontuação máxima possível (todos "sim")
      const pontuacaoMaxima = totalRequisitos * 2;
      
      // Calcular porcentagem
      const porcentagem = Math.round((pontuacaoTotal / pontuacaoMaxima) * 100);

      // Determinar cor baseada na porcentagem
      let cor: 'red' | 'yellow' | 'green';
      if (porcentagem < 40) {
        cor = 'red';
      } else if (porcentagem >= 40 && porcentagem <= 90) {
        cor = 'yellow';
      } else {
        cor = 'green';
      }

      return {
        nome: tema.nome,
        porcentagem,
        cor
      };
    });

    return { temas: temasStats };
  }, [projeto]);
};

export default useProjetoStats;