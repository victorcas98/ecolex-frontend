import React from 'react';
import Button from './Button';
import { SERVER_BASE_URL } from '../services/api';

interface Anexo {
  nome: string;
  caminho: string;
  data: string;
}

interface VisualizarEvidenciaModalProps {
  evidencia: string;
  dataValidade?: string;
  anexos?: Anexo[];
  onClose: () => void;
}

const VisualizarEvidenciaModal: React.FC<VisualizarEvidenciaModalProps> = ({
  evidencia,
  dataValidade,
  anexos,
  onClose,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-accessible-bg-primary rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90%] overflow-y-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="modal-title" className="text-xl font-semibold text-accessible-text-primary">
            Detalhes da Evidência
          </h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-accessible-text-secondary hover:text-accessible-text-primary text-2xl focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 rounded"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        {/* Registro da Evidência */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-accessible-text-primary mb-2">
            Registro da Evidência
          </label>
          <div className="p-3 bg-accessible-bg-secondary rounded-md text-sm text-accessible-text-primary border border-accessible-border whitespace-pre-wrap">
            {evidencia}
          </div>
        </div>

        {/* Data de Validade */}
        {dataValidade && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-accessible-text-primary mb-2">
              Data de Validade
            </label>
            <div className="p-3 bg-accessible-bg-secondary rounded-md text-sm text-accessible-text-primary border border-accessible-border">
              {new Date(dataValidade).toLocaleDateString('pt-BR')}
            </div>
            {/* Warning se a data estiver vencida */}
            {new Date(dataValidade) < new Date() && (
              <div className="mt-3 bg-amber-50 border border-amber-300 rounded-md p-3 text-sm text-amber-800 flex items-center">
                <span aria-hidden="true" className="mr-2 text-lg">⚠️</span>
                <span>
                  <strong>Atenção:</strong> A data de validade desta evidência está vencida.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Anexos */}
        {anexos && anexos.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-accessible-text-primary mb-2">
              Anexos
            </label>
            <div className="space-y-2">
              {anexos.map((anexo, index) => (
                <a
                  key={index}
                  href={`${SERVER_BASE_URL}/${anexo.caminho}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={anexo.nome}
                  className="flex items-center justify-between p-3 bg-accessible-bg-secondary rounded-md text-sm text-accessible-text-primary border border-accessible-border hover:bg-accessible-bg-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accessible-focus"
                  aria-label={`Baixar anexo ${anexo.nome}`}
                >
                  <span className="flex items-center">
                    <span aria-hidden="true" className="mr-2">📄</span>
                    {anexo.nome}
                  </span>
                  <span className="text-accessible-accent hover:text-accessible-accent-hover">
                    Baixar
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Botão */}
        <div className="flex justify-center">
          <Button
            onClick={onClose}
            className="px-8"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualizarEvidenciaModal;
