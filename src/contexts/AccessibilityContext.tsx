import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AccessibilityPreferences } from './accessibilityTypes';
import { 
  defaultPreferences, 
  applyPreferencesToDOM 
} from './accessibilityTypes';
import { AccessibilityContext } from './accessibilityContext';

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences);

  // Carregar preferências do localStorage ao inicializar
  useEffect(() => {
    const savedPreferences = localStorage.getItem('accessibility-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.error('Erro ao carregar preferências de acessibilidade:', error);
      }
    }

    // Detectar preferência do sistema para movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPreferences(prev => ({ ...prev, reducedMotion: true }));
    }

    // Detectar preferência do sistema para alto contraste
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    if (prefersHighContrast) {
      setPreferences(prev => ({ ...prev, highContrast: true }));
    }
  }, []);

  // Salvar preferências no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
    applyPreferencesToDOM(preferences);
  }, [preferences]);

  const updatePreference = <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem('accessibility-preferences');
  };

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!preferences.screenReaderAnnouncements) return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove o elemento após um tempo para não poluir o DOM
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        updatePreference,
        resetPreferences,
        announceToScreenReader,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};