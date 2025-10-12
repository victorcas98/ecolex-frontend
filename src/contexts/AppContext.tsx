import { createContext, useContext } from "react";

export interface AppContextValue {
  showError: (message: string) => void;
  clearError: () => void;
  showSuccess: (message: string) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContext = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
