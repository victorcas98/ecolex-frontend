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
          borderColor: "border-green-500",
          bgColor: "bg-green-50",
          textColor: "text-green-600",
          icon: "✓",
          statusText: "Concluído",
        };
      case "pendente":
        return {
          borderColor: "border-red-500",
          bgColor: "bg-red-50",
          textColor: "text-red-600",
          icon: "⏳",
          statusText: "Pendente",
        };
      default:
        return {
          borderColor: "border-gray-500",
          bgColor: "bg-gray-50",
          textColor: "text-gray-600",
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
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setExpandido(!expandido)}
      >
        <div className="flex items-center space-x-3">
          <span className={`text-xl ${statusConfig.textColor}`}>
            {statusConfig.icon}
          </span>
          <div>
            <h3 className="font-medium text-gray-800">{requisito.nome}</h3>
            <p className={`text-sm ${statusConfig.textColor}`}>
              {statusConfig.statusText}
            </p>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <span
            className={`transform transition-transform ${
              expandido ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
      </div>

      {/* Conteúdo expandido */}
      {expandido && (
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seção Evidências */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">Evidências</h4>
              </div>
              {requisito.evidencia ? (
                <div className="text-sm text-gray-600 mb-3">
                  {requisito.evidencia}
                </div>
              ) : (
                <div className="text-sm text-gray-500 mb-3">
                  Nenhuma evidência registrada
                </div>
              )}
              <button
                onClick={() => onRegistrarEvidencia(requisito)}
                className="text-gray-500 underline hover:text-gray-700 text-sm"
              >
                {requisito.evidencia ? "Editar" : "Registrar nova"}
              </button>
            </div>

            {/* Seção Leis Vinculadas */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">
                Leis vinculadas
              </h4>
              {requisito.leisIds && requisito.leisIds.length > 0 ? (
                <div className="space-y-1">
                  {leisLoading ? (
                    <div className="text-sm text-gray-400">Carregando leis...</div>
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
                          className="text-blue-700 underline block text-sm"
                          target="_blank" rel="noopener noreferrer"
                        >
                          {lei.nome}
                        </a>
                      );
                    })
                  ) : (
                    <div className="text-sm text-gray-500">Nenhuma lei encontrada</div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
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
