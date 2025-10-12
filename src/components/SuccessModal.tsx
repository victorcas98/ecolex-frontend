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
    flex items-center justify-center bg-custom-green rounded-md p-6 w-md h-10 
    border border-custom-blue border-solid shadow-lg animate-fade-in-down"
    >
      <p className="text-sm text-custom-light-blue">Sucesso: {messageToShow}</p>
    </div>
  );
};

export default SuccessModal;
