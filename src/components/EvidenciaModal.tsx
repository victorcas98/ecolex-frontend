import React, { useState } from 'react';
import Button from './Button';
import type { RequisitoStatus } from '../types/projeto';

interface EvidenciaModalProps {
  requisito: RequisitoStatus;
  onClose: () => void;
  onSave: (evidencia: string, data: string, anexos: File[]) => void;
}

const EvidenciaModal: React.FC<EvidenciaModalProps> = ({ requisito, onClose, onSave }) => {
  const [evidencia, setEvidencia] = useState(requisito.evidencia || '');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]); // Data atual
  const [anexos, setAnexos] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const novosAnexos = Array.from(files).slice(0, 3); // Máximo 3 arquivos
      setAnexos(novosAnexos);
    }
  };

  const handleSave = () => {
    if (!evidencia.trim()) {
      alert('Por favor, preencha a evidência/observação');
      return;
    }
    onSave(evidencia, data, anexos);
  };

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
            Registrar Evidências
          </h2>
          <button 
            onClick={onClose}
            className="text-accessible-text-secondary hover:text-accessible-text-primary text-2xl focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 rounded"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        {/* Requisito */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-accessible-text-primary mb-2">
            Requisito
          </label>
          <div className="p-3 bg-accessible-bg-secondary rounded-md text-sm text-accessible-text-primary border border-accessible-border">
            {requisito.nome}
          </div>
        </div>

        {/* Evidência/Observação */}
        <div className="mb-6">
          <label htmlFor="evidencia-textarea" className="block text-sm font-medium text-accessible-text-primary mb-2">
            Evidência/Observação <span className="text-accessible-error">*</span>
          </label>
          <textarea
            id="evidencia-textarea"
            value={evidencia}
            onChange={(e) => setEvidencia(e.target.value)}
            className="w-full p-3 border border-accessible-border rounded-md bg-accessible-bg-primary text-accessible-text-primary focus:ring-2 focus:ring-accessible-focus focus:border-accessible-focus"
            rows={4}
            placeholder="Descreva a evidência ou observação..."
            required
            aria-describedby="evidencia-help"
          />
          <p id="evidencia-help" className="text-sm text-accessible-text-secondary mt-1">
            Campo obrigatório. Descreva detalhadamente a evidência encontrada.
          </p>
        </div>

        {/* Data de VCL */}
        <div className="mb-6">
          <label htmlFor="data-vcl" className="block text-sm font-medium text-accessible-text-primary mb-2">
            Data de VCL
          </label>
          <input
            id="data-vcl"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="p-2 border border-accessible-border rounded-md bg-accessible-bg-primary text-accessible-text-primary focus:ring-2 focus:ring-accessible-focus focus:border-accessible-focus"
            aria-describedby="data-help"
          />
          <p id="data-help" className="text-sm text-accessible-text-secondary mt-1">
            Data da verificação de conformidade legal
          </p>
        </div>

        {/* Anexos */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-accessible-text-primary mb-2">
            Anexos
          </label>
          <div className="space-y-3">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
              aria-describedby="file-help"
            />
            <label
              htmlFor="file-input"
              className="inline-block bg-accessible-accent text-white px-4 py-2 rounded-md cursor-pointer hover:bg-accessible-accent-hover text-sm focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 min-h-touch"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  document.getElementById('file-input')?.click();
                }
              }}
            >
              Inserir novo anexo
            </label>
            
            {anexos.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-accessible-text-primary mb-2">Arquivos selecionados:</p>
                <ul className="text-sm text-accessible-text-primary space-y-1" role="list">
                  {anexos.map((arquivo, index) => (
                    <li key={index} className="flex items-center justify-between py-1 px-2 bg-accessible-bg-secondary rounded">
                      <span>{arquivo.name}</span>
                      <button
                        onClick={() => setAnexos(prev => prev.filter((_, i) => i !== index))}
                        className="text-accessible-error hover:text-red-700 ml-2 focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 rounded px-1"
                        aria-label={`Remover arquivo ${arquivo.name}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <p id="file-help" className="text-sm text-accessible-text-secondary">
              {anexos.length === 0 ? 'Máximo 3 arquivos (PDF, DOC, DOCX, JPG, JPEG, PNG)' : `${anexos.length}/3 arquivos selecionados`}
            </p>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={onClose}
            theme="transparent"
            className="px-8"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="px-8"
            disabled={!evidencia.trim()}
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EvidenciaModal;