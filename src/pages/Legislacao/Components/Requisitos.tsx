import React, { useState } from "react";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";

interface RequisitosSectionProps {
  temaId?: string;
}

const RequisitosSection: React.FC<RequisitosSectionProps> = ({ temaId }) => {
  const [novoRequisito, setNovoRequisito] = useState("");
  const [showInput, setShowInput] = useState(false);

  const requisitosDoTema = [
    { id: "req1", descricao: "Requisito 1", temaId: "tema" },
    { id: "req2", descricao: "Requisito 2", temaId: "tema" },
  ]; // Mocked data

  const handleAddRequisito = () => {};
  return (
    <div className={"px-2"}>
      {/* Lista de requisitos */}
      {requisitosDoTema.length > 0 && (
        <div className="space-y-2">
          <ul className="space-y-1">
            {requisitosDoTema.map((requisito) => (
              <li key={requisito.id} className="">
                {requisito.descricao}
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
                disabled={!novoRequisito.trim()}
              >
                Adicionar
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
