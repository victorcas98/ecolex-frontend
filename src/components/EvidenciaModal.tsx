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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90%] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Registrar Evidências</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Requisito */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requisito
          </label>
          <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-700">
            {requisito.nome}
          </div>
        </div>

        {/* Evidência/Observação */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Evidência/Observação
          </label>
          <textarea
            value={evidencia}
            onChange={(e) => setEvidencia(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Descreva a evidência ou observação..."
          />
        </div>

        {/* Data de VCL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data de VCL
          </label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Anexos */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
            />
            <label
              htmlFor="file-input"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 text-sm"
            >
              Inserir novo anexo
            </label>
            
            {anexos.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Arquivos selecionados:</p>
                <ul className="text-sm text-gray-700">
                  {anexos.map((arquivo, index) => (
                    <li key={index} className="flex items-center justify-between py-1">
                      <span>{arquivo.name}</span>
                      <button
                        onClick={() => setAnexos(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {anexos.length === 0 && (
              <p className="text-sm text-gray-500">Máximo 3 arquivos</p>
            )}
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            className="px-8"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EvidenciaModal;