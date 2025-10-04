import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import RequisitosSection from "./Requisitos";
import Label from "../../../components/LAbel";

const TemasSection: React.FC = () => {
  const [showInput, setShowInput] = useState(false);

  interface Tema {
    id: string;
    nome: string;
  }

  const [temas, setTemas] = useState<Tema[]>([
    
  ]);

    const temasDropdownItems = temas.map(tema => ({
    label: tema.nome,
    value: tema.id
  }));
  return (
    <div>
      <Label text="Tema(s)" />
      {/* Seleção de tema existente */}
      <div className="space-y-2">
        <Button onClick={() => setShowInput(!showInput)} disabled={showInput}>
          + Adicionar tema
        </Button>
        {showInput && (
          <Dropdown
            isClickable
            clickAction={() => {}}
            clickText="+ Criar novo tema"
            items={temasDropdownItems}
            onSelect={() => setShowInput(false)}
            placeholder="Selecione um tema"
          />
        )}
      </div>
      {/* Lista de temas adicionados */}
      {temas.length > 0 && (
        <div className="space-y-2 pt-3">
          <ul className="space-y-1">
            {temas.map((tema) => (
              <li
                key={tema.id}
                className="px-3 bg-custom-light-blue text-custom-green rounded-md"
              >
                <Label theme="secundary" text={tema.nome} />
                <div className="px-2">
                  <Label text="Requisitos" />
                  <RequisitosSection temaId={"tema"} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TemasSection;
