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
        <form 
          className="space-y-4 px-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          aria-label="Formulário de cadastro de legislação"
        >
          {/* Nome da Lei */}
          <div>
            <Label 
              text="Nome da Lei" 
              htmlFor="nome-lei"
              required
            />
            <TextInput
              value={nomeLei}
              onChange={setNomeLei}
              placeholder="Digite o nome da legislação"
              label=""
              required
              type="text"
            />
          </div>

          {/* Origem */}
          <fieldset className="space-y-2">
            <legend className="block text-sm mb-2 text-accessible-text-primary font-medium">
              Origem da Legislação
            </legend>
            <div className="flex space-x-2" role="radiogroup" aria-label="Tipo de origem da legislação">
              <ToggleButton
                selected={toggleType === "link"}
                onClick={() => {
                  setToggleType("link");
                  setSelectedFile(null);
                }}
              >
                Link
              </ToggleButton>
              <ToggleButton
                selected={toggleType === "doc"}
                onClick={() => {
                  setToggleType("doc");
                  setUrl("");
                }}
              >
                Documento
              </ToggleButton>
            </div>
          </fieldset>

          {/* URL/Link ou Upload de Documento */}
          {toggleType === "link" ? (
            <div>
              <Label 
                text="URL da Legislação" 
                htmlFor="url-lei"
                required
              />
              <TextInput
                value={url}
                onChange={setUrl}
                placeholder="https://..."
                label=""
                type="url"
                required
              />
            </div>
          ) : (
            <div>
              <Label 
                text="Documento PDF" 
                htmlFor="arquivo-lei"
                required
              />
              <div className="space-y-2">
                <input
                  id="arquivo-lei"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log("Arquivo selecionado:", file.name);
                      setSelectedFile(file);
                    }
                  }}
                  className="w-full rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-accessible-accent file:text-white hover:file:bg-accessible-accent-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2"
                  aria-label="Selecionar arquivo PDF da legislação"
                  required
                />
                <p className="text-accessible-text-secondary text-sm" id="file-help">
                  Apenas arquivos PDF são aceitos
                </p>
              </div>
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
                (toggleType === "link" ? url.trim().length < 5 : selectedFile === null)
              }
              className="w-[40%]"
              onClick={handleSubmit}
              type="submit"
              loading={loading}
              ariaLabel={loading ? "Cadastrando legislação..." : "Cadastrar nova legislação"}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Legislacao;
