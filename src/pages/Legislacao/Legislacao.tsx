import React, { useState } from "react";
import Button from "../../components/Button";
import Label from "../../components/Label";
import TextInput from "../../components/TextInput";
import ToggleButton from "../../components/ToggleButton";
import Title from "../../components/Title";
import TemasSection from "./Components/TemasSection";
import { useLeis } from "../../hooks";
import type { CreateLeiData } from "../../services";

const Legislacao: React.FC = () => {
  type ToggleType = "link" | "doc";
  const [toggleType, setToggleType] = useState<ToggleType>("link");
  const [nomeLei, setNomeLei] = useState("");
  const [url, setUrl] = useState("");
  const [temasIds, setTemasIds] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Hook personalizado
  const { createLei, loading, clearError } = useLeis();


  const handleSubmit = async () => {
    try {
      clearError();
      const leiData: CreateLeiData = {
        nome: nomeLei,
        link: toggleType === "link" ? url : undefined,
        documento: toggleType === "doc" ? selectedFile : undefined,
        temasIds,
      };
      const novaLei = await createLei(leiData);

      if (novaLei) {
        // Resetar formulário
        setNomeLei("");
        setUrl("");
        setSelectedFile(null);
        setTemasIds([]);
        setToggleType("link");
        // Redirecionar para a página inicial
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Erro no submit:", err);
    }
  };

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
            value={nomeLei}
            onChange={setNomeLei}
            placeholder="Digite o nome da legislação"
          />

          {/* Origem */}
          <div className="space-y-2">
            <Label text="Origem" />
            <div className="flex space-x-2">
              <ToggleButton
                selected={toggleType === "link"}
                onClick={() => {
                  setToggleType("link");
                }}
              >
                Link
              </ToggleButton>
              <ToggleButton
                selected={toggleType === "doc"}
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
              value={url}
              onChange={setUrl}
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
                    setSelectedFile(file);
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

          <TemasSection setTemasIds={setTemasIds} temasIds={temasIds} />
          
          {/* Botão Salvar */}
          <div className="py-6 w-full flex justify-center">
            <Button
              disabled={
                loading ||
                nomeLei.trim().length < 3 ||
                temasIds.length < 1 ||
                (toggleType === "link" ? url.trim().length < 5 : selectedFile === null) // url mínimo 10 chars ou arquivo selecionado
              }
              className="w-[40%]"
              onClick={handleSubmit}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legislacao;
