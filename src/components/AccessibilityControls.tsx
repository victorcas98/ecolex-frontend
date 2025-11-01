import React, { useState } from 'react';
import { useAccessibility } from '../contexts';

interface AccessibilityControlsProps {
  className?: string;
}

export const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({ 
  className = '' 
}) => {
  const { preferences, updatePreference, resetPreferences, announceToScreenReader } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const fontSizeLabels = {
    small: 'A-',
    medium: 'A',
    large: 'A+',
    'extra-large': 'A++'
  };

  const handleToggleHighContrast = () => {
    const newValue = !preferences.highContrast;
    updatePreference('highContrast', newValue);
    announceToScreenReader(
      newValue ? 'Alto contraste ativado' : 'Alto contraste desativado'
    );
  };

  const handleFontSizeChange = (size: typeof preferences.fontSize) => {
    updatePreference('fontSize', size);
    announceToScreenReader(`Tamanho da fonte alterado para ${fontSizeLabels[size]}`);
  };

  const handleToggleReducedMotion = () => {
    const newValue = !preferences.reducedMotion;
    updatePreference('reducedMotion', newValue);
    announceToScreenReader(
      newValue ? 'Movimento reduzido ativado' : 'Movimento reduzido desativado'
    );
  };

  const handleToggleScreenReaderAnnouncements = () => {
    const newValue = !preferences.screenReaderAnnouncements;
    updatePreference('screenReaderAnnouncements', newValue);
    if (newValue) {
      announceToScreenReader('Anúncios para leitor de tela ativados');
    }
  };

  const handleReset = () => {
    resetPreferences();
    announceToScreenReader('Preferências de acessibilidade redefinidas');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Botão para abrir controles */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="btn-secondary flex items-center gap-2 p-2"
        aria-label="Abrir controles de acessibilidade"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Controles de Acessibilidade"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" 
          />
        </svg>
        <span className="sr-only">Acessibilidade</span>
      </button>

      {/* Painel de controles */}
      {isOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          <div
            className="absolute right-0 top-full mt-2 w-80 bg-accessible-bg-primary border border-accessible-border rounded-lg shadow-lg z-50 p-4"
            role="dialog"
            aria-label="Controles de Acessibilidade"
            onKeyDown={handleKeyDown}
          >
            <div className="space-y-4">
              {/* Cabeçalho */}
              <div className="flex items-center justify-between border-b border-accessible-border pb-2">
                <h3 className="text-lg font-semibold text-accessible-text-primary">
                  Acessibilidade
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-accessible-bg-secondary"
                  aria-label="Fechar controles de acessibilidade"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>

              {/* Alto Contraste */}
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="high-contrast-toggle"
                  className="text-accessible-text-primary font-medium"
                >
                  Alto Contraste
                </label>
                <button
                  type="button"
                  id="high-contrast-toggle"
                  onClick={handleToggleHighContrast}
                  className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                    preferences.highContrast 
                      ? 'bg-accessible-accent' 
                      : 'bg-accessible-border'
                  }`}
                  role="switch"
                  aria-checked={preferences.highContrast}
                  aria-label={`Alto contraste ${preferences.highContrast ? 'ativado' : 'desativado'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ${
                      preferences.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Tamanho da Fonte */}
              <div>
                <p className="text-accessible-text-primary font-medium mb-2">
                  Tamanho da Fonte
                </p>
                <div className="flex gap-2" role="radiogroup" aria-label="Tamanho da fonte">
                  {Object.entries(fontSizeLabels).map(([size, label]) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleFontSizeChange(size as typeof preferences.fontSize)}
                      className={`px-3 py-2 rounded border text-sm font-medium transition-colors ${
                        preferences.fontSize === size
                          ? 'bg-accessible-accent text-white border-accessible-accent'
                          : 'bg-accessible-bg-secondary text-accessible-text-primary border-accessible-border hover:bg-accessible-bg-primary'
                      }`}
                      role="radio"
                      aria-checked={preferences.fontSize === size}
                      aria-label={`Tamanho da fonte: ${label}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Movimento Reduzido */}
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="reduced-motion-toggle"
                  className="text-accessible-text-primary font-medium"
                >
                  Reduzir Movimento
                </label>
                <button
                  type="button"
                  id="reduced-motion-toggle"
                  onClick={handleToggleReducedMotion}
                  className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                    preferences.reducedMotion 
                      ? 'bg-accessible-accent' 
                      : 'bg-accessible-border'
                  }`}
                  role="switch"
                  aria-checked={preferences.reducedMotion}
                  aria-label={`Movimento reduzido ${preferences.reducedMotion ? 'ativado' : 'desativado'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ${
                      preferences.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Anúncios para Leitor de Tela */}
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="screen-reader-toggle"
                  className="text-accessible-text-primary font-medium"
                >
                  Anúncios Sonoros
                </label>
                <button
                  type="button"
                  id="screen-reader-toggle"
                  onClick={handleToggleScreenReaderAnnouncements}
                  className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                    preferences.screenReaderAnnouncements 
                      ? 'bg-accessible-accent' 
                      : 'bg-accessible-border'
                  }`}
                  role="switch"
                  aria-checked={preferences.screenReaderAnnouncements}
                  aria-label={`Anúncios para leitor de tela ${preferences.screenReaderAnnouncements ? 'ativados' : 'desativados'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ${
                      preferences.screenReaderAnnouncements ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Botão Reset */}
              <div className="border-t border-accessible-border pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full btn-secondary text-sm"
                  aria-label="Redefinir todas as preferências de acessibilidade"
                >
                  Redefinir Preferências
                </button>
              </div>

              {/* Informações sobre acessibilidade */}
              <div className="text-xs text-accessible-text-secondary">
                <p>
                  Este sistema segue os padrões da Lei Brasileira de Inclusão (nº 13.146/2015) 
                  e o modelo eMAG de acessibilidade digital.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};