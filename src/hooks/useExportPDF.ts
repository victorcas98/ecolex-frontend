import { useCallback } from 'react';
import jsPDF from 'jspdf';
import type { Projeto } from '../types/projeto';

interface ExportOptions {
  includeEvidence?: boolean;
  includeStats?: boolean;
}

export const useExportPDF = () => {
  const exportProjectSummary = useCallback(
    async (projeto: Projeto, options: ExportOptions = {}) => {
      const { includeEvidence = true, includeStats = true } = options;

      try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = margin;

        // Função auxiliar para adicionar nova página se necessário
        const checkPageBreak = (requiredSpace: number) => {
          if (yPos + requiredSpace > pageHeight - margin) {
            pdf.addPage();
            yPos = margin;
            return true;
          }
          return false;
        };

        // Cabeçalho
        pdf.setFillColor(41, 128, 185);
        pdf.rect(0, 0, pageWidth, 40, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Resumo do Projeto', pageWidth / 2, 25, { align: 'center' });

        yPos = 50;

        // Informações do Projeto
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Informações Gerais', margin, yPos);
        yPos += 10;

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Nome do Projeto: ${projeto.nome}`, margin, yPos);
        yPos += 8;
        pdf.text(`Data de Geração: ${new Date().toLocaleDateString('pt-BR')}`, margin, yPos);
        yPos += 8;
        pdf.text(`Total de Temas: ${projeto.temas.length}`, margin, yPos);
        yPos += 15;

        // Estatísticas Gerais (se habilitado)
        if (includeStats) {
          checkPageBreak(30);
          
          const totalRequisitos = projeto.temas.reduce(
            (acc, tema) => acc + tema.requisitos.length,
            0
          );
          const requisitosConcluidos = projeto.temas.reduce(
            (acc, tema) =>
              acc + tema.requisitos.filter(req => req.status === 'concluido').length,
            0
          );
          const porcentagemGeral = totalRequisitos > 0
            ? Math.round((requisitosConcluidos / totalRequisitos) * 100)
            : 0;

          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Estatísticas Gerais', margin, yPos);
          yPos += 10;

          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Total de Requisitos: ${totalRequisitos}`, margin, yPos);
          yPos += 8;
          pdf.text(`Requisitos Concluídos: ${requisitosConcluidos}`, margin, yPos);
          yPos += 8;
          pdf.text(`Requisitos Pendentes: ${totalRequisitos - requisitosConcluidos}`, margin, yPos);
          yPos += 8;
          
          // Barra de progresso
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Progresso Geral: ${porcentagemGeral}%`, margin, yPos);
          yPos += 8;

          // Desenhar barra de progresso
          const barWidth = pageWidth - 2 * margin;
          const barHeight = 10;
          pdf.setDrawColor(200, 200, 200);
          pdf.setFillColor(240, 240, 240);
          pdf.roundedRect(margin, yPos, barWidth, barHeight, 2, 2, 'FD');

          // Preenchimento da barra
          const fillWidth = (barWidth * porcentagemGeral) / 100;
          let barColor;
          if (porcentagemGeral < 40) {
            barColor = [231, 76, 60]; // Vermelho
          } else if (porcentagemGeral <= 90) {
            barColor = [241, 196, 15]; // Amarelo
          } else {
            barColor = [46, 204, 113]; // Verde
          }
          pdf.setFillColor(barColor[0], barColor[1], barColor[2]);
          pdf.roundedRect(margin, yPos, fillWidth, barHeight, 2, 2, 'F');

          yPos += 20;
        }

        // Detalhamento por Temas
        checkPageBreak(30);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Detalhamento por Temas', margin, yPos);
        yPos += 12;

        projeto.temas.forEach((tema, temaIndex) => {
          checkPageBreak(40);

          // Cabeçalho do Tema
          pdf.setFillColor(52, 152, 219);
          pdf.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 12, 2, 2, 'F');
          
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${temaIndex + 1}. ${tema.nome}`, margin + 3, yPos + 3);
          yPos += 15;

          // Estatísticas do Tema
          const totalReqTema = tema.requisitos.length;
          const concluidosTema = tema.requisitos.filter(
            req => req.status === 'concluido'
          ).length;
          const porcentagemTema = totalReqTema > 0
            ? Math.round((concluidosTema / totalReqTema) * 100)
            : 0;

          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.text(
            `Requisitos: ${concluidosTema}/${totalReqTema} concluídos (${porcentagemTema}%)`,
            margin + 3,
            yPos
          );
          yPos += 10;

          // Lista de Requisitos
          tema.requisitos.forEach((requisito) => {
            checkPageBreak(includeEvidence && requisito.evidencia ? 25 : 15);

            // Bullet point com status
            const statusSymbol = requisito.status === 'concluido' ? '✓' : '○';
            const statusColor = requisito.status === 'concluido' ? [46, 204, 113] : [149, 165, 166];
            
            pdf.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text(statusSymbol, margin + 5, yPos);
            
            pdf.setTextColor(0, 0, 0);
            pdf.setFont('helvetica', 'normal');
            const reqText = `${requisito.nome}`;
            const splitText = pdf.splitTextToSize(reqText, pageWidth - margin - 50);
            pdf.text(splitText, margin + 12, yPos);
            yPos += splitText.length * 5;

            // Evidência (se habilitado e existir)
            if (includeEvidence && requisito.evidencia) {
              pdf.setFontSize(9);
              pdf.setTextColor(100, 100, 100);
              pdf.setFont('helvetica', 'italic');
              const evidenciaText = `Evidência: ${requisito.evidencia}`;
              const splitEvidencia = pdf.splitTextToSize(
                evidenciaText,
                pageWidth - margin - 50
              );
              pdf.text(splitEvidencia, margin + 12, yPos);
              yPos += splitEvidencia.length * 4.5;
            }

            // Anexos (se existirem)
            if (requisito.anexo && requisito.anexo.length > 0) {
              pdf.setFontSize(9);
              pdf.setTextColor(100, 100, 100);
              pdf.setFont('helvetica', 'normal');
              pdf.text(`Anexos: ${requisito.anexo.length}`, margin + 12, yPos);
              yPos += 5;
            }

            yPos += 3;
          });

          yPos += 8;
        });

        // Rodapé
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totalPages = (pdf as any).internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(9);
          pdf.setTextColor(150, 150, 150);
          pdf.setFont('helvetica', 'normal');
          pdf.text(
            `Página ${i} de ${totalPages}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
          );
        }

        // Salvar PDF
        const fileName = `resumo-${projeto.nome.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`;
        pdf.save(fileName);

        return { success: true, fileName };
      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        return { success: false, error };
      }
    },
    []
  );

  return { exportProjectSummary };
};
