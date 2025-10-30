import React from "react";

interface SuccessModalProps {
  message?: string | null;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message }) => {
  const [messageToShow, setMessageToShow] = React.useState<string>("");
  
  React.useEffect(() => {
    if (message) {
      setMessageToShow(message);
      const timer = setTimeout(() => {
        setMessageToShow("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  if (!messageToShow) return null;

  return (
    <div
      className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 
    flex items-center justify-center bg-accessible-success rounded-md p-4 min-h-touch
    border border-accessible-border shadow-lg animate-pulse"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="text-sm text-white font-medium">
        ✓ Sucesso: {messageToShow}
      </p>
    </div>
  );
};

export default SuccessModal;
