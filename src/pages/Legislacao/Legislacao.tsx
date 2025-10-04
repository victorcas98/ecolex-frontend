import React, { useState } from "react";
import Button from "../../components/Button";
import Label from "../../components/LAbel";
import TextInput from "../../components/TextInput";
import ToggleButton from "../../components/ToggleButton";
import Title from "../../components/Title";
import TemasSection from "./Components/TemasSection";

const Legislacao: React.FC = () => {
  type ToggleType = "link" | "doc";
  const [toggleType, setToggleType] = useState<ToggleType>("link");
  return (
    <div className="w-full h-screen">
      <div className="space-y-6">
        {/* Cabeçalho */}
        <Title title="Cadastrar Legislação" />
        {/* Formulário */}
        <div className="space-y-2 px-8">
          {/* Nome da Lei */}
          <Label text="Nome da Lei" />
          <TextInput
            value={"nomeLei"}
            onChange={() => {}}
            placeholder="Digite o nome da legislação"
          />

          {/* Origem */}
          <div className="space-y-2">
            <Label text="Origem" />
            <div className="flex space-x-2">
              <ToggleButton
                selected
                onClick={() => {
                  setToggleType("link");
                }}
              >
                Link
              </ToggleButton>
              <ToggleButton
                selected={false}
                onClick={() => {
                  setToggleType("doc");
                }}
              >
                Documento
              </ToggleButton>
            </div>
          </div>

          {/* URL/Link */}

          {toggleType === "link" ? (
            <TextInput
              value={"url"}
              onChange={() => {}}
              placeholder="https://..."
            />
          ) : (
            <div className="space-y-2">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("Arquivo selecionado:", file.name);
                  }
                }}
                className="w-full rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-custom-blue file:text-custom-light-blue hover:file:bg-blue-600 cursor-pointer"
              />
              <p className="text-custom-grey">
                Apenas arquivos PDF são aceitos
              </p>
            </div>
          )}

          {/* Seção Temas */}

          <TemasSection />

          {/* Botão Salvar */}
          <div className="py-6 w-full flex justify-center">
            <Button disabled className="w-[40%]" onClick={() => {}}>
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legislacao;
