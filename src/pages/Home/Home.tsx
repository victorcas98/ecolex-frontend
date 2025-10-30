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
          <p className="text-accessible-text-secondary">Carregando projetos...</p>
        </div>
      ) : projetos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-accessible-text-secondary">Nenhum projeto encontrado.</p>
          <p className="text-accessible-text-secondary text-sm mt-2">Crie seu primeiro projeto clicando no botão abaixo.</p>
        </div>
      ) : (
        <section aria-label="Lista de projetos">
          {projetos.map((projeto) => (
            <article
              key={projeto.id}
              className="mx-10 border-b-2 border-custom-blue pb-1 my-2 cursor-pointer hover:bg-accessible-bg-secondary transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2"
              onClick={() => handleProjetoClick(projeto.id)}
              role="button"
              tabIndex={0}
              aria-label={`Abrir projeto ${projeto.nome}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjetoClick(projeto.id);
                }
              }}
            >
              <h2 className="px-2 pt-2 text-accessible-text-primary hover:text-accessible-accent">
                {projeto.nome}
              </h2>
            </article>
          ))}
        </section>
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
