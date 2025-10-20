import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useTemas, useRequisitos } from "../../../hooks";

interface RequisitosSectionProps {
  temaId: string;
}

const RequisitosSection: React.FC<RequisitosSectionProps> = ({ temaId }) => {
  const [novoRequisito, setNovoRequisito] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { getTemaById } = useTemas();
  const { requisitos, getByTema, createRequisito, loading } = useRequisitos();
console.log("Requisitos carregados:", requisitos, 'temaId:', temaId);
  useEffect(() => {
    getByTema(temaId);
  }, [temaId, getByTema]);

  const handleAddRequisito = async () => {
    const criado = await createRequisito({ nome: novoRequisito, temaId });
    if (criado) {
      // Optionally refresh tema details (keeps source-of-truth in temas hook)
      await getTemaById(temaId);
      setNovoRequisito("");
      setShowInput(false);
    }
  };
  return (
    <div className={"px-2"}>
      {/* Lista de requisitos */}
      {requisitos.length > 0 && (
        <div className="space-y-2">
          <ul className="space-y-1">
            {requisitos.map((requisito) => (
              <li key={requisito.id} className="">
                {requisito.nome}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Adicionar novo requisito */}
      <div className="space-y-2 pt-2">
        {!showInput ? (
          <Button onClick={() => setShowInput(true)} disabled={!temaId}>
            + Adicionar requisito
          </Button>
        ) : (
          <div className="space-y-2">
            <TextInput
              value={novoRequisito}
              onChange={setNovoRequisito}
              placeholder="Descrição do requisito"
            />
            <div className="flex space-x-2">
              <Button
                onClick={handleAddRequisito}
                disabled={!novoRequisito.trim() || loading}
              >
                {loading ? 'Adicionando...' : 'Adicionar'}
              </Button>
              <Button
                onClick={() => {
                  setShowInput(false);
                  setNovoRequisito("");
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequisitosSection;
