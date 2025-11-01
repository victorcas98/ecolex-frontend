import React, { useState, useEffect } from "react";
import type { Lei } from "../services/leisService";
import leisService from "../services/leisService";
import type { RequisitoStatus } from "../types/projeto";
import { SERVER_BASE_URL } from "../services/api";
import VisualizarEvidenciaModal from "./VisualizarEvidenciaModal";

interface RequisitoCardProps {
  requisito: RequisitoStatus;
  onRegistrarEvidencia: (requisito: RequisitoStatus) => void;
}

const RequisitoCard: React.FC<RequisitoCardProps> = ({
  requisito,
  onRegistrarEvidencia,
}) => {
  const [expandido, setExpandido] = useState(false);
  const [modalVisualizarAberto, setModalVisualizarAberto] = useState(false);

    // State for law details
    const [leis, setLeis] = useState<Lei[]>([]);
    const [leisLoading, setLeisLoading] = useState(false);

    useEffect(() => {
      if (expandido && requisito.leisIds && requisito.leisIds.length > 0) {
        setLeisLoading(true);
        Promise.all(requisito.leisIds.map((id) => leisService.getById(id)))
          .then((leisData) => setLeis(leisData))
          .catch(() => setLeis([]))
          .finally(() => setLeisLoading(false));
      } else {
        setLeis([]);
      }
    }, [expandido, requisito.leisIds]);

  // Determinar cor e ícone baseado no status
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "concluido":
        return {
          borderColor: "border-accessible-success",
          bgColor: "bg-green-50",
          textColor: "text-accessible-success",
          icon: "✓",
          statusText: "Concluído",
        };
      case "pendente":
        return {
          borderColor: "border-accessible-error",
          bgColor: "bg-red-50",
          textColor: "text-accessible-error",
          icon: "⏳",
          statusText: "Pendente",
        };
      default:
        return {
          borderColor: "border-accessible-border",
          bgColor: "bg-accessible-bg-secondary",
          textColor: "text-accessible-text-secondary",
          icon: "?",
          statusText: "Desconhecido",
        };
    }
  };

  const statusConfig = getStatusConfig(requisito.status);

  // Verificar se a data de validade está vencida
  const isDataVencida = requisito.dataValidade 
    ? new Date(requisito.dataValidade) < new Date() 
    : false;

  return (
    <div
      className={`border-2 rounded-lg ${statusConfig.borderColor} ${statusConfig.bgColor}`}
    >
      {/* Header do card */}
      <div
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-accessible-bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-inset"
        onClick={() => setExpandido(!expandido)}
        role="button"
        tabIndex={0}
        aria-expanded={expandido}
        aria-label={`${requisito.nome} - ${statusConfig.statusText}. Clique para ${expandido ? 'ocultar' : 'mostrar'} detalhes`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpandido(!expandido);
          }
        }}
      >
        <div className="flex items-center space-x-3">
          <span className={`text-xl ${statusConfig.textColor}`} aria-hidden="true">
            {statusConfig.icon}
          </span>
          <div>
            <h3 className="font-medium text-accessible-text-primary">{requisito.nome}</h3>
            <p className={`text-sm ${statusConfig.textColor}`}>
              {statusConfig.statusText}
            </p>
            {/* Warning de data vencida */}
            {isDataVencida && (
              <p className="text-xs text-amber-600 font-medium mt-1 flex items-center">
                <span aria-hidden="true" className="mr-1">⚠️</span>
                Data de validade vencida
              </p>
            )}
          </div>
        </div>

        <button 
          type="button"
          className="text-accessible-text-secondary hover:text-accessible-text-primary focus:outline-none"
          aria-label={expandido ? 'Ocultar detalhes' : 'Mostrar detalhes'}
        >
          <span
            className={`transform transition-transform ${
              expandido ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            ▼
          </span>
        </button>
      </div>

      {/* Conteúdo expandido */}
      {expandido && (
        <div className="border-t border-accessible-border p-4 bg-accessible-bg-primary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seção Evidências */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-accessible-text-primary">Evidências</h4>
              </div>
              {requisito.evidencia ? (
                <>
                  <button
                    type="button"
                    onClick={() => setModalVisualizarAberto(true)}
                    className="text-sm text-accessible-text-primary mb-2 text-left hover:text-accessible-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 rounded p-1 -m-1 block"
                    aria-label={`Ver detalhes da evidência de ${requisito.nome}`}
                  >
                    {requisito.evidencia.length > 100 
                      ? `${requisito.evidencia.substring(0, 100)}...` 
                      : requisito.evidencia}
                  </button>
                  {/* Warning de data vencida na seção expandida */}
                  {isDataVencida && (
                    <div className="bg-amber-50 border border-amber-300 rounded-md p-2 mb-3 text-xs text-amber-800 flex items-center">
                      <span aria-hidden="true" className="mr-2 text-base">⚠️</span>
                      <span>
                        <strong>Atenção:</strong> A data de validade desta evidência está vencida. 
                        {requisito.dataValidade && (
                          <> Venceu em {new Date(requisito.dataValidade).toLocaleDateString('pt-BR')}.</>
                        )}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-accessible-text-secondary mb-3">
                  Nenhuma evidência registrada
                </div>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => onRegistrarEvidencia(requisito)}
                  className="text-accessible-accent underline hover:text-accessible-accent-hover text-sm focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2"
                  aria-label={`${requisito.evidencia ? 'Editar' : 'Registrar nova'} evidência para ${requisito.nome}`}
                >
                  {requisito.evidencia ? "Editar" : "Registrar nova"}
                </button>
              </div>
            </div>

            {/* Seção Leis Vinculadas */}
            <div>
              <h4 className="font-medium text-accessible-text-primary mb-3">
                Leis vinculadas
              </h4>
              {requisito.leisIds && requisito.leisIds.length > 0 ? (
                <div className="space-y-1">
                  {leisLoading ? (
                    <div className="text-sm text-accessible-text-secondary">Carregando leis...</div>
                  ) : leis.length > 0 ? (
                    leis.map((lei) => {
                      // Se for link: abre em nova aba
                      // Se for documento: faz download direto
                      const isLink = !!lei.link;
                      const href = lei.link || (lei.documento ? `${SERVER_BASE_URL}/${lei.documento}` : "#");
                      
                      return (
                        <a
                          key={lei.id}
                          href={href}
                          className="text-accessible-accent underline hover:text-accessible-accent-hover block text-sm focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2"
                          target="_blank"
                          rel="noopener noreferrer"
                          download={!isLink && lei.documento ? lei.documento.split('/').pop() : undefined}
                          aria-label={isLink ? `Abrir lei ${lei.nome} em nova aba` : `Baixar documento da lei ${lei.nome}`}
                        >
                          {lei.nome} {!isLink && lei.documento && <span aria-hidden="true">📄</span>}
                        </a>
                      );
                    })
                  ) : (
                    <div className="text-sm text-accessible-text-secondary">Nenhuma lei encontrada</div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-accessible-text-secondary">
                  Nenhuma lei vinculada
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Visualização da Evidência */}
      {modalVisualizarAberto && requisito.evidencia && (
        <VisualizarEvidenciaModal
          evidencia={requisito.evidencia}
          dataValidade={requisito.dataValidade}
          anexos={requisito.anexo}
          onClose={() => setModalVisualizarAberto(false)}
        />
      )}
    </div>
  );
};

export default RequisitoCard;
