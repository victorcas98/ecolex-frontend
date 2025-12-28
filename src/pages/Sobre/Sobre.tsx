import React from 'react';
import Title from '../../components/Title';
import { useAccessibility } from '../../contexts';

const Sobre: React.FC = () => {
  const { announceToScreenReader } = useAccessibility();

  React.useEffect(() => {
    // Anúncio mais detalhado para leitores de tela
    announceToScreenReader('Página sobre o EcoLex carregada. Esta página contém informações detalhadas sobre o projeto, funcionalidades, equipe de desenvolvimento e recursos de acessibilidade.');
    
    // Definir o foco no título principal para leitores de tela
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
      mainHeading.focus();
    }
  }, [announceToScreenReader]);

  // Função para melhorar navegação por seções
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.focus();
      announceToScreenReader(`Navegando para seção: ${element.textContent}`);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Title title="Sobre EcoLex" />
      
      {/* Navegação rápida para acessibilidade */}
      <nav aria-label="Navegação rápida da página" className="px-8 py-4 bg-accessible-bg-secondary border-b border-accessible-border">
        <h2 className="text-lg font-semibold text-accessible-text-primary mb-3">
          Navegação Rápida
        </h2>
        <ul className="flex flex-wrap gap-4 text-sm">
          <li>
            <button 
              type="button"
              onClick={() => scrollToSection('introducao-heading')}
              className="text-accessible-accent hover:text-accessible-accent-hover underline focus:outline-none focus:ring-2 focus:ring-accessible-accent focus:ring-offset-2"
              aria-label="Ir para seção: O que é o EcoLex?"
            >
              O que é o EcoLex?
            </button>
          </li>
          <li>
            <button 
              type="button"
              onClick={() => scrollToSection('funcionalidades-heading')}
              className="text-accessible-accent hover:text-accessible-accent-hover underline focus:outline-none focus:ring-2 focus:ring-accessible-accent focus:ring-offset-2"
              aria-label="Ir para seção: Principais Funcionalidades"
            >
              Funcionalidades
            </button>
          </li>
          <li>
            <button 
              type="button"
              onClick={() => scrollToSection('como-funciona-heading')}
              className="text-accessible-accent hover:text-accessible-accent-hover underline focus:outline-none focus:ring-2 focus:ring-accessible-accent focus:ring-offset-2"
              aria-label="Ir para seção: Como Funciona o Sistema"
            >
              Como Funciona
            </button>
          </li>
          <li>
            <button 
              type="button"
              onClick={() => scrollToSection('evidencias-heading')}
              className="text-accessible-accent hover:text-accessible-accent-hover underline focus:outline-none focus:ring-2 focus:ring-accessible-accent focus:ring-offset-2"
              aria-label="Ir para seção: Gestão de Evidências"
            >
              Evidências
            </button>
          </li>
          <li>
            <button 
              type="button"
              onClick={() => scrollToSection('acessibilidade-heading')}
              className="text-accessible-accent hover:text-accessible-accent-hover underline focus:outline-none focus:ring-2 focus:ring-accessible-accent focus:ring-offset-2"
              aria-label="Ir para seção: Recursos de Acessibilidade"
            >
              Acessibilidade
            </button>
          </li>
          <li>
            <button 
              type="button"
              onClick={() => scrollToSection('autores-heading')}
              className="text-accessible-accent hover:text-accessible-accent-hover underline focus:outline-none focus:ring-2 focus:ring-accessible-accent focus:ring-offset-2"
              aria-label="Ir para seção: Equipe de Desenvolvimento"
            >
              Equipe
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="px-8 py-6 space-y-8 max-w-4xl">
        {/* Introdução */}
        <section aria-labelledby="introducao-heading">
          <h2 id="introducao-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            O que é o EcoLex?
          </h2>
          <div className="bg-accessible-bg-secondary p-6 rounded-lg border border-accessible-border">
            <p className="text-accessible-text-primary text-lg leading-relaxed mb-4">
              O <strong>EcoLex</strong> é um software livre de gestão de requisitos legais ambientais desenvolvido 
              para auxiliar organizações na identificação, atualização, controle e monitoramento dos requisitos 
              legais aplicáveis, garantindo conformidade com a legislação vigente.
            </p>
            <div className="bg-accessible-accent bg-opacity-10 p-4 rounded-md border-l-4 border-accessible-accent">
              <p className="text-accessible-text-primary font-medium">
                <span className="text-accessible-accent">📋 MVP:</span> Esta é uma versão de 
                <strong> Produto Mínimo Viável (MVP)</strong>, desenvolvida para demonstrar as 
                funcionalidades principais do sistema.
              </p>
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section aria-labelledby="funcionalidades-heading">
          <h2 id="funcionalidades-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            Principais Funcionalidades
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-accessible-text-primary mb-3">
                🏢 Gestão de Projetos
              </h3>
              <p className="text-accessible-text-primary">
                Organize e gerencie diferentes projetos ambientais com requisitos específicos 
                de conformidade legal.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-accessible-text-primary mb-3">
                📚 Base de Legislação
              </h3>
              <p className="text-accessible-text-primary">
                Cadastre e organize normas, leis e regulamentos ambientais aplicáveis 
                ao seu contexto organizacional.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-accessible-text-primary mb-3">
                ✅ Monitoramento de Conformidade
              </h3>
              <p className="text-accessible-text-primary">
                Acompanhe o atendimento aos requisitos legais com indicadores visuais 
                e relatórios de progresso.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-accessible-text-primary mb-3">
                📄 Gestão de Evidências
              </h3>
              <p className="text-accessible-text-primary">
                Registre evidências de conformidade, documentos e observações para 
                auditorias e verificações.
              </p>
            </div>
          </div>
        </section>

        {/* Como funciona o sistema */}
        <section aria-labelledby="como-funciona-heading">
          <h2 id="como-funciona-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            📖 Como Funciona o Sistema
          </h2>
          
          {/* Estrutura Hierárquica */}
          <div className="bg-accessible-bg-secondary p-6 rounded-lg border border-accessible-border mb-6">
            <h3 className="text-xl font-semibold text-accessible-text-primary mb-4">
              🏗️ Estrutura Hierárquica
            </h3>
            <p className="text-accessible-text-primary mb-4">
              O EcoLex organiza as informações em uma estrutura hierárquica de 4 níveis:
            </p>
            <div className="space-y-4">
              <div className="bg-accessible-bg-primary p-4 rounded border-l-4 border-accessible-accent">
                <h4 className="font-semibold text-accessible-text-primary mb-2">1. 📚 Legislação (Lei)</h4>
                <p className="text-accessible-text-primary text-sm">
                  Representa uma norma, lei ou regulamento ambiental. Exemplo: "Lei nº 12.305/2010 - Política Nacional de Resíduos Sólidos".
                  Pode conter um link externo ou documento PDF anexado.
                </p>
              </div>
              
              <div className="bg-accessible-bg-primary p-4 rounded border-l-4 border-accessible-success">
                <h4 className="font-semibold text-accessible-text-primary mb-2">2. 📑 Tema</h4>
                <p className="text-accessible-text-primary text-sm">
                  Agrupa requisitos relacionados a um assunto específico dentro de uma legislação. 
                  Exemplos: "Conservação da Biodiversidade", "Saúde e Segurança do Trabalho", "Gestão de Resíduos".
                  Um tema pertence a uma ou mais leis.
                </p>
              </div>
              
              <div className="bg-accessible-bg-primary p-4 rounded border-l-4 border-accessible-warning">
                <h4 className="font-semibold text-accessible-text-primary mb-2">3. ✅ Requisito</h4>
                <p className="text-accessible-text-primary text-sm">
                  Representa uma obrigação legal específica que deve ser atendida. 
                  Exemplos: "Realizar Estudo de Impacto Ambiental", "Manter Registro de Resíduos Perigosos".
                  Um requisito pertence a um tema específico.
                </p>
              </div>
              
              <div className="bg-accessible-bg-primary p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-accessible-text-primary mb-2">4. 🏢 Projeto</h4>
                <p className="text-accessible-text-primary text-sm">
                  Representa uma implementação específica na sua organização. Você seleciona quais requisitos 
                  são aplicáveis ao projeto e acompanha o atendimento de cada um.
                </p>
              </div>
            </div>
          </div>

          {/* Como criar uma legislação */}
          <div className="bg-accessible-success bg-opacity-10 p-6 rounded-lg border border-accessible-success mb-6">
            <h3 className="text-xl font-semibold text-accessible-success mb-4">
              📝 Como Cadastrar uma Legislação
            </h3>
            <ol className="space-y-3 text-accessible-text-primary list-decimal list-inside">
              <li>
                <strong>Acesse a página "Legislação"</strong> através do menu (Alt + L)
              </li>
              <li>
                <strong>Preencha o nome da lei:</strong> Digite o nome completo da legislação (ex: "Lei nº 6.938/1981 - Política Nacional do Meio Ambiente")
              </li>
              <li>
                <strong>Escolha a origem:</strong> Selecione se deseja adicionar um link externo ou fazer upload de um documento PDF
              </li>
              <li>
                <strong>Cadastre ou selecione temas:</strong> 
                <ul className="ml-8 mt-2 space-y-1 list-disc">
                  <li>Clique em "+ Criar novo tema" para adicionar um tema inédito</li>
                  <li>Ou selecione temas já existentes na lista</li>
                  <li>Para cada tema, você pode adicionar requisitos específicos</li>
                </ul>
              </li>
              <li>
                <strong>Adicione requisitos aos temas:</strong>
                <ul className="ml-8 mt-2 space-y-1 list-disc">
                  <li>Clique em "+ Adicionar requisito" dentro de cada tema</li>
                  <li>Digite o nome do requisito (ex: "Obter Licença Prévia")</li>
                </ul>
              </li>
              <li>
                <strong>Clique em "Cadastrar"</strong> para salvar a legislação
              </li>
            </ol>
            <div className="mt-4 p-3 bg-white bg-opacity-50 rounded">
              <p className="text-sm text-accessible-text-primary">
                <strong>💡 Dica:</strong> É obrigatório ter pelo menos um tema e um requisito antes de cadastrar a lei.
              </p>
            </div>
          </div>

          {/* Como criar um projeto */}
          <div className="bg-accessible-accent bg-opacity-10 p-6 rounded-lg border border-accessible-accent mb-6">
            <h3 className="text-xl font-semibold text-accessible-accent mb-4">
              🏗️ Como Criar um Projeto
            </h3>
            <ol className="space-y-3 text-accessible-text-primary list-decimal list-inside">
              <li>
                <strong>Acesse "Novo Projeto"</strong> através do menu (Alt + N) ou pelo botão na página inicial
              </li>
              <li>
                <strong>Digite o nome do projeto:</strong> Escolha um nome descritivo (ex: "Projeto de Expansão Industrial 2025")
              </li>
              <li>
                <strong>Selecione os requisitos aplicáveis:</strong>
                <ul className="ml-8 mt-2 space-y-1 list-disc">
                  <li>O sistema exibirá todos os temas cadastrados</li>
                  <li>Expanda cada tema clicando nele para ver seus requisitos</li>
                  <li>Marque os requisitos que se aplicam ao seu projeto</li>
                  <li>Você não precisa incluir todos - apenas os relevantes</li>
                </ul>
              </li>
              <li>
                <strong>Clique em "Cadastrar Projeto"</strong> para criar
              </li>
              <li>
                <strong>Todos os requisitos selecionados</strong> começarão com status "Pendente" (vermelho)
              </li>
            </ol>
            <div className="mt-4 p-3 bg-white bg-opacity-50 rounded">
              <p className="text-sm text-accessible-text-primary">
                <strong>⚠️ Importante:</strong> Você precisa ter cadastrado legislações, temas e requisitos antes de criar um projeto.
              </p>
            </div>
          </div>

          {/* Sistema de Status e Cores */}
          <div className="bg-accessible-bg-secondary p-6 rounded-lg border border-accessible-border">
            <h3 className="text-xl font-semibold text-accessible-text-primary mb-4">
              🎨 Sistema de Status e Cores
            </h3>
            <p className="text-accessible-text-primary mb-4">
              O EcoLex utiliza um sistema visual intuitivo baseado em cores para indicar o status de conformidade dos requisitos:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 bg-red-500 rounded flex items-center justify-center text-white font-bold flex-shrink-0">
                  ⚠️
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-accessible-text-primary mb-1">
                    Pendente (Vermelho)
                  </h4>
                  <p className="text-accessible-text-primary text-sm">
                    <strong>Status inicial de todos os requisitos.</strong> Indica que o requisito ainda não foi atendido 
                    e precisa de ação. Nenhuma evidência foi registrada.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 bg-green-500 rounded flex items-center justify-center text-white font-bold flex-shrink-0">
                  ✓
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-accessible-text-primary mb-1">
                    Concluído (Verde)
                  </h4>
                  <p className="text-accessible-text-primary text-sm">
                    <strong>Requisito atendido.</strong> Indica que o requisito foi cumprido e há evidências registradas.
                    É necessário adicionar uma evidência (descrição de como foi atendido) para mudar para este status.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accessible-accent bg-opacity-10 rounded border border-accessible-accent">
              <h4 className="font-semibold text-accessible-text-primary mb-2">
                📊 Cálculo de Progresso do Projeto
              </h4>
              <p className="text-accessible-text-primary text-sm mb-2">
                O sistema calcula automaticamente o percentual de conformidade:
              </p>
              <div className="bg-white bg-opacity-50 p-3 rounded font-mono text-sm">
                <p className="text-accessible-text-primary">
                  Progresso = (Requisitos Concluídos ÷ Total de Requisitos) × 100%
                </p>
              </div>
              <p className="text-accessible-text-primary text-sm mt-2">
                <strong>Exemplo:</strong> Se um projeto tem 10 requisitos e 7 estão concluídos, o progresso é 70%.
              </p>
            </div>

            <div className="mt-4 p-4 bg-accessible-success bg-opacity-10 rounded border border-accessible-success">
              <h4 className="font-semibold text-accessible-success mb-2">
                ✅ Quando um Projeto está "Pronto"?
              </h4>
              <p className="text-accessible-text-primary text-sm">
                Um projeto é considerado <strong>100% conforme</strong> quando todos os requisitos selecionados 
                estão com status "Concluído" (verde) e possuem evidências registradas. Isso significa que 
                a organização está atendendo integralmente aos requisitos legais aplicáveis ao projeto.
              </p>
            </div>
          </div>
        </section>

        {/* Gestão de Evidências */}
        <section aria-labelledby="evidencias-heading">
          <h2 id="evidencias-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            📎 Gestão de Evidências
          </h2>
          <div className="bg-accessible-bg-secondary p-6 rounded-lg border border-accessible-border">
            <p className="text-accessible-text-primary mb-4">
              Para comprovar o atendimento aos requisitos legais, você pode registrar evidências:
            </p>
            
            <div className="space-y-4">
              <div className="bg-accessible-bg-primary p-4 rounded">
                <h4 className="font-semibold text-accessible-text-primary mb-2">
                  Como Registrar uma Evidência:
                </h4>
                <ol className="text-accessible-text-primary text-sm space-y-2 list-decimal list-inside">
                  <li>Acesse um projeto no Dashboard</li>
                  <li>Clique em um tema para ver seus requisitos</li>
                  <li>Clique em "Registrar Evidência" no requisito desejado</li>
                  <li>Preencha a descrição da evidência (como o requisito foi atendido)</li>
                  <li>Defina a data de validade (se aplicável)</li>
                  <li>Anexe até 3 documentos comprobatórios (PDFs, imagens, etc.)</li>
                  <li>Clique em "Salvar" - o requisito mudará automaticamente para "Concluído"</li>
                </ol>
              </div>

              <div className="bg-accessible-warning bg-opacity-10 p-4 rounded border border-accessible-warning">
                <h4 className="font-semibold text-accessible-text-primary mb-2">
                  🔍 Visualizando Evidências:
                </h4>
                <p className="text-accessible-text-primary text-sm">
                  Requisitos com evidências registradas exibem um botão "Visualizar Evidência" que permite 
                  consultar a descrição, data de validade e fazer download dos documentos anexados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vantagens */}
        <section aria-labelledby="vantagens-heading">
          <h2 id="vantagens-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            Principais Vantagens
          </h2>
          <div className="space-y-4">
            <div className="bg-accessible-success bg-opacity-10 p-4 rounded-lg border border-accessible-success">
              <h3 className="text-lg font-semibold text-accessible-success mb-2 flex items-center">
                ♿ Acessibilidade Digital
              </h3>
              <p className="text-accessible-text-primary">
                Sistema desenvolvido com recursos de acessibilidade que possibilitam sua utilização 
                por pessoas com deficiência visual, promovendo equidade no acesso às informações. 
                Conforme Lei Brasileira de Inclusão (nº 13.146/2015) e modelo eMAG.
              </p>
            </div>
            
            <div className="bg-accessible-accent bg-opacity-10 p-4 rounded-lg border border-accessible-accent">
              <h3 className="text-lg font-semibold text-accessible-accent mb-2 flex items-center">
                🆓 Software Livre
              </h3>
              <p className="text-accessible-text-primary">
                Pode ser utilizado sem custos de licenciamento, permitindo maior democratização 
                do acesso e utilização por diferentes organizações, independentemente do porte 
                ou capacidade financeira.
              </p>
            </div>
          </div>
        </section>

        {/* Seção específica sobre acessibilidade */}
        <section aria-labelledby="acessibilidade-heading">
          <h2 id="acessibilidade-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            ♿ Recursos de Acessibilidade Digital
          </h2>
          <div className="bg-accessible-success bg-opacity-10 p-6 rounded-lg border border-accessible-success space-y-4">
            <p className="text-accessible-text-primary text-lg">
              O EcoLex foi desenvolvido seguindo rigorosamente a <strong>Lei Brasileira de Inclusão 
              (nº 13.146/2015)</strong> e o <strong>modelo eMAG (Modelo de Acessibilidade Digital)</strong>.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-50 p-4 rounded">
                <h3 className="font-semibold text-accessible-text-primary mb-2">
                  🎧 Para Leitores de Tela
                </h3>
                <ul className="text-accessible-text-primary text-sm space-y-1">
                  <li>• Compatível com NVDA, JAWS e Orca</li>
                  <li>• Estrutura semântica completa</li>
                  <li>• ARIA labels e landmarks</li>
                  <li>• Anúncios contextuais</li>
                </ul>
              </div>
              
              <div className="bg-white bg-opacity-50 p-4 rounded">
                <h3 className="font-semibold text-accessible-text-primary mb-2">
                  ⌨️ Navegação por Teclado
                </h3>
                <ul className="text-accessible-text-primary text-sm space-y-1">
                  <li>• Tab/Shift+Tab para navegação</li>
                  <li>• Enter/Space para ativação</li>
                  <li>• Escape para fechar modais</li>
                  <li>• Atalhos Alt+Tecla para páginas</li>
                </ul>
              </div>
              
              <div className="bg-white bg-opacity-50 p-4 rounded">
                <h3 className="font-semibold text-accessible-text-primary mb-2">
                  🎨 Visual e Contraste
                </h3>
                <ul className="text-accessible-text-primary text-sm space-y-1">
                  <li>• Contraste mínimo 4.5:1</li>
                  <li>• Alto contraste 7:1</li>
                  <li>• 4 níveis de tamanho de fonte</li>
                  <li>• Foco visível em elementos</li>
                </ul>
              </div>
              
              <div className="bg-white bg-opacity-50 p-4 rounded">
                <h3 className="font-semibold text-accessible-text-primary mb-2">
                  ⚡ Preferências do Sistema
                </h3>
                <ul className="text-accessible-text-primary text-sm space-y-1">
                  <li>• Movimento reduzido</li>
                  <li>• Persistência de configurações</li>
                  <li>• Detecção automática de preferências</li>
                  <li>• Skip links para navegação rápida</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-accessible-accent bg-opacity-20 p-4 rounded border border-accessible-accent">
              <h4 className="font-semibold text-accessible-text-primary mb-2">
                🛠️ Ferramentas de Teste Implementadas:
              </h4>
              <p className="text-accessible-text-primary text-sm">
                <strong>react-axe</strong> para auditoria automática de acessibilidade em desenvolvimento • 
                <strong>Lighthouse</strong> para verificação de contraste e semântica • 
                Testes com <strong>leitores de tela reais</strong> (NVDA, Orca)
              </p>
            </div>
          </div>
        </section>

        {/* Atalhos de teclado disponíveis */}
        <section aria-labelledby="atalhos-heading">
          <h2 id="atalhos-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            ⌨️ Atalhos de Teclado Disponíveis
          </h2>
          <div className="bg-accessible-bg-secondary p-6 rounded-lg border border-accessible-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-accessible-text-primary mb-3">Navegação Principal:</h3>
                <ul className="space-y-2 text-accessible-text-primary">
                  <li><span><kbd className="bg-accessible-accent text-white [data-theme='high-contrast'] &:text-black px-2 py-1 rounded text-xs font-medium">Alt + P</kbd> Projetos</span></li>
                  <li><span><kbd className="bg-accessible-accent text-white [data-theme='high-contrast'] &:text-black px-2 py-1 rounded text-xs font-medium">Alt + N</kbd> Novo Projeto</span></li>
                  <li><span><kbd className="bg-accessible-accent text-white [data-theme='high-contrast'] &:text-black px-2 py-1 rounded text-xs font-medium">Alt + L</kbd> Legislação</span></li>
                  <li><span><kbd className="bg-accessible-accent text-white [data-theme='high-contrast'] &:text-black px-2 py-1 rounded text-xs font-medium">Alt + S</kbd> Sobre</span></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-accessible-text-primary mb-3">Navegação Geral:</h3>
                <ul className="space-y-2 text-accessible-text-primary">
                  <li><span><kbd className="bg-accessible-accent text-white [data-theme='high-contrast'] &:text-black px-2 py-1 rounded text-xs font-medium">Tab</kbd> Próximo elemento</span></li>
                  <li><span><kbd className="bg-accessible-accent text-white [data-theme='high-contrast'] &:text-black px-2 py-1 rounded text-xs font-medium">Shift + Tab</kbd> Elemento anterior</span></li>
                  <li><span><kbd className="bg-accessible-accent text-white [data-theme='high-contrast'] &:text-black px-2 py-1 rounded text-xs font-medium">Enter/Space</kbd> Ativar</span></li>
                  <li><span><kbd className="bg-accessible-accent text-white [data-theme='high-contrast'] &:text-black px-2 py-1 rounded text-xs font-medium">Esc</kbd> Fechar modal</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Perspectivas Futuras */}
        <section aria-labelledby="futuro-heading">
          <h2 id="futuro-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            Perspectivas Futuras
          </h2>
          <div className="bg-accessible-bg-secondary p-6 rounded-lg border border-accessible-border">
            <ul className="space-y-3 text-accessible-text-primary">
              <li className="flex items-start">
                <span className="text-accessible-accent mr-2">🔄</span>
                <span>Expansão para outras áreas de conformidade legal (saúde e segurança ocupacional)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accessible-accent mr-2">🔗</span>
                <span>Integração com diferentes sistemas de gestão empresarial</span>
              </li>
              <li className="flex items-start">
                <span className="text-accessible-accent mr-2">🌐</span>
                <span>Consolidação como plataforma livre e colaborativa de governança ambiental</span>
              </li>
              <li className="flex items-start">
                <span className="text-accessible-accent mr-2">📈</span>
                <span>Ampliação das funcionalidades de acessibilidade e inclusão</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Informações Técnicas */}
        <section aria-labelledby="tecnicas-heading">
          <h2 id="tecnicas-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            Informações Técnicas
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-accessible-text-primary mb-3">
                💻 Tecnologias
              </h3>
              <ul className="text-accessible-text-primary space-y-1">
                <li>• React.js (Frontend)</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Node.js (Backend)</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-accessible-text-primary mb-3">
                📊 Classificação
              </h3>
              <ul className="text-accessible-text-primary space-y-1">
                <li>• Campo: Tecnologia e Legislação</li>
                <li>• Tipo: Gerenciamento de Informações</li>
                <li>• Data de Criação: 01/09/2025</li>
                <li>• Status: MVP</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Autores */}
        <section aria-labelledby="autores-heading">
          <h2 id="autores-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            Equipe de Desenvolvimento
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-accessible-text-primary mb-3">
                🧬 Barbara Fernanda Amorim Santos Macedo
              </h3>
              <ul className="text-accessible-text-primary space-y-1 text-sm">
                <li><strong>Profissão:</strong> Bióloga</li>
                <li><strong>Vínculo:</strong> Aluna Pós-Graduação (Dissertação de Mestrado)</li>
                <li><strong>Campus:</strong> IFMG - Bambuí</li>
                <li><strong>Departamento:</strong> Ciência da Computação</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-accessible-text-primary mb-3">
                💻 Victor Castro de Carvalho
              </h3>
              <ul className="text-accessible-text-primary space-y-1 text-sm">
                <li><strong>Profissão:</strong> Desenvolvedor de Software</li>
                <li><strong>Vínculo:</strong> Participante Externo</li>
                <li><strong>Campus:</strong> IFMG - Formiga</li>
                <li><strong>Departamento:</strong> Ciência da Computação</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Instituição */}
        <section aria-labelledby="instituicao-heading">
          <h2 id="instituicao-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            Instituição
          </h2>
          <div className="bg-accessible-bg-secondary p-6 rounded-lg border border-accessible-border text-center">
            <h3 className="text-xl font-semibold text-accessible-text-primary mb-2">
              Instituto Federal de Minas Gerais (IFMG)
            </h3>
            <p className="text-accessible-text-secondary">
              Campus Bambuí e Formiga - Departamento de Ciência da Computação
            </p>
            <p className="text-accessible-text-secondary mt-2">
              Projeto desenvolvido como parte de pesquisa acadêmica em gestão ambiental 
              e conformidade legal
            </p>
          </div>
        </section>

        {/* Licença */}
        <section aria-labelledby="licenca-heading">
          <h2 id="licenca-heading" className="text-2xl font-semibold text-accessible-text-primary mb-4">
            Licença e Disponibilidade
          </h2>
          <div className="bg-accessible-success bg-opacity-10 p-6 rounded-lg border border-accessible-success">
            <p className="text-accessible-text-primary">
              <strong>Software Livre:</strong> O EcoLex será disponibilizado como software livre, 
              sem custos de licenciamento, promovendo o acesso democrático à tecnologia de 
              gestão ambiental para organizações de todos os portes.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-8">
          <div className="bg-accessible-accent bg-opacity-10 p-6 rounded-lg border border-accessible-accent">
            <h3 className="text-xl font-semibold text-accessible-text-primary mb-4">
              Contribua para um Futuro Sustentável
            </h3>
            <p className="text-accessible-text-primary mb-4">
              O EcoLex é mais que um software - é uma ferramenta para construir um mundo 
              mais sustentável e inclusivo através da conformidade legal ambiental.
            </p>
            <p className="text-accessible-text-secondary text-sm">
              Este MVP demonstra o potencial da plataforma. Suas contribuições e feedback 
              são fundamentais para o desenvolvimento completo do sistema.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sobre;