import React from "react";

interface ErrorModalProps {
  message?: string | null;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
    bg-custom-black bg-opacity-40 text-custom-black"
    >
      <div className="bg-custom-light-blue border border-custom-red rounded-md p-6 w-11/12 max-w-md">
        <h3 className="text-lg font-semibold text-custom-red">Erro</h3>
        <p className="mt-2 text-sm">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-custom-red rounded-md text-custom-light-blue"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
