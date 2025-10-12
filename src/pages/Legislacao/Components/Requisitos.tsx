import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useTemas } from "../../../hooks";

interface RequisitosSectionProps {
  temaId?: string;
}

const RequisitosSection: React.FC<RequisitosSectionProps> = ({ temaId }) => {
  const [novoRequisito, setNovoRequisito] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { getTemaById } = useTemas();
  const [requisitosDoTema, setRequisitosDoTema] = useState<{
    id: number | string;
    descricao: string;
    temaId: number | string;
  }[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!temaId) return setRequisitosDoTema([]);
      const tema = await getTemaById(temaId);
      if (!mounted) return;
      setRequisitosDoTema(tema?.requisitos || []);
    };
    load();
    return () => { mounted = false };
  }, [temaId, getTemaById]);

  const handleAddRequisito = () => {
    // TODO: call requisitosService.create(...) then refresh tema requisitos
    console.log('Adicionar requisito (pendente):', novoRequisito, temaId);
  };
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
