import { useContext } from 'react';
import { AccessibilityContext } from './accessibilityContext';

// Hook para usar o contexto
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility deve ser usado dentro de um AccessibilityProvider');
  }
  return context;
};