// Tipos para as preferências de acessibilidade
export interface AccessibilityPreferences {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  reducedMotion: boolean;
  screenReaderAnnouncements: boolean;
}

export interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreference: <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => void;
  resetPreferences: () => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
}

export const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  fontSize: 'medium',
  reducedMotion: false,
  screenReaderAnnouncements: true,
};

// Função para aplicar preferências ao DOM
export const applyPreferencesToDOM = (preferences: AccessibilityPreferences) => {
  const root = document.documentElement;
  
  // Alto contraste
  if (preferences.highContrast) {
    root.setAttribute('data-theme', 'high-contrast');
  } else {
    root.removeAttribute('data-theme');
  }
  
  // Tamanho da fonte
  root.setAttribute('data-font-size', preferences.fontSize);
  
  // Movimento reduzido
  if (preferences.reducedMotion) {
    root.style.setProperty('--animation-duration', '0ms');
    root.style.setProperty('--transition-duration', '0ms');
  } else {
    root.style.removeProperty('--animation-duration');
    root.style.removeProperty('--transition-duration');
  }
};