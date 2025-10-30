import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import { AccessibilityControls } from './AccessibilityControls';

const Layout: React.FC = () => {
  return (
    <div className='flex flex-row bg-accessible-bg-secondary text-accessible-text-primary min-h-screen'>
      {/* Skip link para navegação por teclado */}
      <a 
        href="#main-content" 
        className="skip-link"
        tabIndex={0}
      >
        Pular para o conteúdo principal
      </a>
      
      {/* Navegação lateral */}
      <aside 
        className="flex-shrink-0"
        role="navigation"
        aria-label="Navegação principal"
      >
        <Navigation />
      </aside>
      
      {/* Área principal de conteúdo */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Cabeçalho com controles de acessibilidade */}
        <header 
          className="bg-accessible-bg-primary border-b border-accessible-border p-4 flex justify-end items-center"
          role="banner"
        >
          <AccessibilityControls />
        </header>
        
        {/* Conteúdo principal */}
        <main 
          id="main-content"
          className='flex-1 overflow-y-auto'
          role="main"
          tabIndex={-1}
          aria-label="Conteúdo principal"
        >
          <Outlet />
        </main>
      </div>
      
      {/* Área para anúncios de acessibilidade */}
      <div 
        id="accessibility-announcements" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
    </div>
  );
};

export default Layout;