import React from 'react';
import ecolexLogo from '../../assets/ecolex-logo.png';
import NavigationItem from './NavigationItem';

const Navigation: React.FC = () => {
  return (
    <nav 
      className="w-64 h-screen bg-accessible-accent p-6 shadow-lg"
      aria-label="Menu principal de navegação"
    >
      {/* Logo */}
      <div className="mb-8">
        <img 
          src={ecolexLogo} 
          alt="EcoLex - Sistema de Gestão de Conformidade Ambiental" 
          className="h-8 w-auto"
        />
      </div>
      
      {/* Menu Items */}
      <ul 
        className="space-y-4"
        aria-label="Menu de navegação"
      >
        <NavigationItem 
          label="Projetos" 
          destiny="/" 
          ariaLabel="Ir para a página de projetos"
          accessKey="p"
        />
        <NavigationItem 
          label="Novo projeto" 
          destiny="/projeto" 
          ariaLabel="Criar um novo projeto"
          accessKey="n"
        />
        <NavigationItem 
          label="Legislação" 
          destiny="/legislacao" 
          ariaLabel="Consultar legislação ambiental"
          accessKey="l"
        />
        <NavigationItem 
          label="Sobre EcoLex" 
          destiny="/sobre" 
          ariaLabel="Informações sobre o sistema EcoLex"
          accessKey="s"
        />
      </ul>
      
      {/* Informação de atalhos */}
      <div className="mt-8 p-3 bg-white bg-opacity-20 rounded text-black text-xs border border-black border-opacity-20">
        <p className="font-semibold mb-1">Atalhos de teclado:</p>
        <ul className="space-y-1">
          <li>Alt + P: Projetos</li>
          <li>Alt + N: Novo projeto</li>
          <li>Alt + L: Legislação</li>
          <li>Alt + S: Sobre</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;