import React from "react";

interface ErrorModalProps {
  message?: string | null;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
    bg-black bg-opacity-50"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-title"
    >
      <div 
        className="bg-accessible-bg-primary border border-accessible-error rounded-md p-6 w-11/12 max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 
          id="error-title"
          className="text-lg font-semibold text-accessible-error"
        >
          Erro
        </h3>
        <p className="mt-2 text-accessible-text-primary">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-accessible-error rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 min-h-touch"
            aria-label="Fechar modal de erro"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
