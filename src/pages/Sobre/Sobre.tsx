import React from 'react';
import Title from '../../components/Title';
import { useAccessibility } from '../../contexts';

const Sobre: React.FC = () => {
  const { announceToScreenReader } = useAccessibility();

  React.useEffect(() => {
    announceToScreenReader('Página sobre o EcoLex carregada');
  }, [announceToScreenReader]);

  return (
    <div className="w-full min-h-screen">
      <Title title="Sobre EcoLex" />
      
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
                <li>• Status: MVP (Em Desenvolvimento)</li>
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