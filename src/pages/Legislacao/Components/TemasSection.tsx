import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import RequisitosSection from "./Requisitos";
import Label from "../../../components/Label";
import { useTemas } from "../../../hooks";
import { useAppContext } from "../../../contexts/AppContext";

interface TemasSectionProps {
  setTemasIds: React.Dispatch<React.SetStateAction<string[]>>;
  temasIds: string[];
}

const TemasSection: React.FC<TemasSectionProps> = ({
  setTemasIds,
  temasIds,
}) => {
  const { temas, getAllTemas, createTema, error } = useTemas();
  const { showError } = useAppContext();

  React.useEffect(() => {
    if (error) showError(error);
  }, [error, showError]);

  React.useEffect(() => {
    getAllTemas();
  }, [getAllTemas]);
  const [dropDownText, setDropDownText] = useState<
    "+ Criar novo tema" | "Registrar tema"
  >("+ Criar novo tema");
  const [selectedTema, setSelectedTema] = useState<
    "primary" | "registerNewTheme"
  >("primary");
  const [newTemaName, setNewTemaName] = useState("");
  const temasToShow = React.useMemo(() => {
    console.log("Temas disponíveis:", temas);
    return temas
      .filter((tema) => temasIds?.includes(String(tema.id)))
      .map((tema) => (
        <li
          key={tema.id}
          className="px-3 bg-custom-light-blue text-custom-green rounded-md"
        >
          <div className="flex justify-between items-center">
            <Label theme="secondary" text={tema.nome} />
            <Button
              theme="transparent"
              onClick={() =>
                setTemasIds((prev) =>
                  prev.filter((id) => id !== String(tema.id))
                )
              }
            >
              - Remover tema
            </Button>
          </div>
          <div className="px-2">
            <Label text="Requisitos" />
            <RequisitosSection temaId={String(tema.id)} />
          </div>
        </li>
      ));
  }, [setTemasIds, temas, temasIds]);

  const handleThemeDropdownClick = () => {
    if (dropDownText === "Registrar tema") {
      createTema({ nome: newTemaName }).then((novoTema) => {
        if (novoTema) {
          setTemasIds((prev) =>
            prev.includes(String(novoTema.id)) ? prev : [...prev, String(novoTema.id)]
          );
        }
        setSelectedTema("primary");
        setDropDownText("+ Criar novo tema");
        setNewTemaName("");
        getAllTemas();

        // fechar dropdown: remover foco e disparar clique fora (caso o Dropdown feche ao clicar fora)
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        setTimeout(() => document.body.click(), 0);
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
          <Dropdown
            theme={selectedTema}
            isClickable
            clickAction={handleThemeDropdownClick}
            clickTextPlaceholder={dropDownText}
            clickText={newTemaName}
            clickTextOnChange={(e) => setNewTemaName(e.target.value)}
            items={temasDropdownItems}
            onSelect={(item) => {
              setTemasIds((prev) =>
                prev.includes(item.value as string)
                  ? prev
                  : [...prev, item.value as string]
              );
            }}
            placeholder="Selecione os temas para a lei"
          />
      </div>
      {/* Lista de temas adicionados */}
      {temasIds?.length !== undefined && temasIds?.length > 0 && (
        <div className="space-y-2 pt-3">
          <ul className="space-y-1">{temasToShow}</ul>
        </div>
      )}
    </div>
  );
};

export default TemasSection;
