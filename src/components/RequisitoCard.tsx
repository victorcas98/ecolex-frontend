import React, { useState, useEffect } from "react";
import type { Lei } from "../services/leisService";
import leisService from "../services/leisService";
import type { RequisitoStatus } from "../types/projeto";

interface RequisitoCardProps {
  requisito: RequisitoStatus;
  onRegistrarEvidencia: (requisito: RequisitoStatus) => void;
}

const RequisitoCard: React.FC<RequisitoCardProps> = ({
  requisito,
  onRegistrarEvidencia,
}) => {
  const [expandido, setExpandido] = useState(false);

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
          </div>
        </div>

        <button 
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
                <div className="text-sm text-accessible-text-primary mb-3">
                  {requisito.evidencia}
                </div>
              ) : (
                <div className="text-sm text-accessible-text-secondary mb-3">
                  Nenhuma evidência registrada
                </div>
              )}
              <button
                onClick={() => onRegistrarEvidencia(requisito)}
                className="text-accessible-accent underline hover:text-accessible-accent-hover text-sm focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2"
                aria-label={`${requisito.evidencia ? 'Editar' : 'Registrar nova'} evidência para ${requisito.nome}`}
              >
                {requisito.evidencia ? "Editar" : "Registrar nova"}
              </button>
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
                      let href = "#";
                      if (lei.link) {
                        href = lei.link;
                      } else if (lei.documento) {
                        href = lei.documento;
                      }
                      return (
                        <a
                          key={lei.id}
                          href={href}
                          className="text-accessible-accent underline hover:text-accessible-accent-hover block text-sm focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2"
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`Abrir lei ${lei.nome} em nova aba`}
                        >
                          {lei.nome}
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
    </div>
  );
};

export default RequisitoCard;
