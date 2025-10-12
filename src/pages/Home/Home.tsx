import React, { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";

const Home: React.FC = () => {
  interface Project {
    name: string;
    id: string;
  }
  const [projectsList, setProjectsList] = useState<Project[]>([
    { name: "Projeto Vale 46778/a153", id: "id" },
  ]);
  return (
    <div className="w-full h-screen">
      <Title title="Home" />
      {projectsList.map((project) => (
        <div className="mx-10 border-b-2 border-custom-blue pb-1 mx-y cursor-pointer">
          <h1 className="px-2 pt-2 hover:text-custom-grey">
            {project.name}
          </h1>
        </div>
      ))}
      <div className="flex justify-end my-6 mx-10">
        <Button theme="secondary" onClick={() => {}} >
          Cadastrar novo projeto
        </Button>
      </div>
    </div>
  );
};

export default Home;
