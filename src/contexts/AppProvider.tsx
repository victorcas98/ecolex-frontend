import React, { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import ErrorModal from '../components/ErrorModal';
import { AppContext } from './AppContext';
import SuccessModal from '../components/SuccessModal';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const showError = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);
  const showSuccess = useCallback((message: string) => {
    setSuccessMessage(message);
  }, []);

  const clearError = useCallback(() => setErrorMessage(null), []);

  return (
    <AppContext.Provider value={{  showError, clearError, showSuccess }}>
      {children}
      <SuccessModal message={successMessage}/>
      <ErrorModal message={errorMessage} onClose={clearError} />
    </AppContext.Provider>
  );
};

export default AppProvider;
