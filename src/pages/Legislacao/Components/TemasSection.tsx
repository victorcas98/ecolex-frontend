import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import RequisitosSection from "./Requisitos";
import Label from "../../../components/LAbel";
import { useTemas } from "../../../hooks";
import { useAppContext } from "../../../contexts/AppContext";

const TemasSection: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const { temas, getAllTemas, createTema, deleteTema, error } = useTemas();
  const { showError } = useAppContext();

  React.useEffect(() => {
    if (error) showError(error);
  }, [error, showError]);

  React.useEffect(() => {
    getAllTemas();
  }, [getAllTemas]);
  const [dropDownText, setDropDownText] = useState<"+ Criar novo tema" | "Registrar tema">("+ Criar novo tema");
  const [selectedTema, setSelectedTema] = useState<"primary" | "registerNewTheme">("primary");
  const [newTemaName, setNewTemaName] = useState("");

  const handleThemeDropdownClick = () => {
    if (dropDownText === "Registrar tema") {
      createTema({ nome: newTemaName}).then(() => {
        setSelectedTema("primary");
        setDropDownText("+ Criar novo tema");
        setNewTemaName("");
        getAllTemas();
      });
    } else {
      setSelectedTema("registerNewTheme");
      setDropDownText("Registrar tema");
    }
  };
  const temasDropdownItems = temas.map((tema) => ({
    label: tema.nome,
    value: String(tema.id),
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
            theme={selectedTema}
            isClickable
            clickAction={handleThemeDropdownClick}
            clickTextPlaceholder={dropDownText}
            clickText={newTemaName}
            clickTextOnChange={(e) => setNewTemaName(e.target.value)}
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
                <div className="flex justify-between items-center">
                  <Label theme="secundary" text={tema.nome} />
                  <Button theme="transparent" onClick={() => deleteTema(tema.id)}>- Remover tema</Button>
                </div>
                <div className="px-2">
                  <Label text="Requisitos" />
                  <RequisitosSection temaId={String(tema.id)} />
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
