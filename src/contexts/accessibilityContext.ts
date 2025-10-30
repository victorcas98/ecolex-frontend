import { createContext } from 'react';
import type { AccessibilityContextType } from './accessibilityTypes';

export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);