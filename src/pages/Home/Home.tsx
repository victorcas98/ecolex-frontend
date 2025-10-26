import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useProjetos } from "../../hooks/useProjetos";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { projetos, getAllProjetos, loading } = useProjetos();

  // Carregar projetos ao montar o componente
  useEffect(() => {
    getAllProjetos();
  }, [getAllProjetos]);

  const handleNovoProjetoClick = () => {
    navigate('/projeto');
  };

  const handleProjetoClick = (projetoId: string) => {
    // Navegar para dashboard do projeto
    navigate(`/dashboard/${projetoId}`);
  };

  return (
    <div className="w-full h-screen">
      <Title title="Home" />
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Carregando projetos...</p>
        </div>
      ) : projetos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum projeto encontrado.</p>
          <p className="text-gray-400 text-sm mt-2">Crie seu primeiro projeto clicando no botão abaixo.</p>
        </div>
      ) : (
        projetos.map((projeto) => (
          <div 
            key={projeto.id}
            className="mx-10 border-b-2 border-custom-blue pb-1 my-2 cursor-pointer"
            onClick={() => handleProjetoClick(projeto.id)}
          >
            <h1 className="px-2 pt-2 hover:text-custom-grey">
              {projeto.nome}
            </h1>
          </div>
        ))
      )}
      
      <div className="flex justify-end my-6 mx-10">
        <Button theme="secondary" onClick={handleNovoProjetoClick}>
          Cadastrar novo projeto
        </Button>
      </div>
    </div>
  );
};

export default Home;
