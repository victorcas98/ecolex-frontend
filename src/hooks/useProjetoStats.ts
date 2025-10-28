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
      // ✅ concluido = 100%, pendente = 0%
      const requisitosConcluidos = tema.requisitos.filter(req => req.status === 'concluido').length;
      
      // Calcular porcentagem
      const porcentagem = Math.round((requisitosConcluidos / totalRequisitos) * 100);

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