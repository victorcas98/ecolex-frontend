import React, { useState } from "react";

interface ExpandableSectionProps {
  title: string;
  isExpanded?: boolean;
  children: React.ReactNode;
  className?: string;
  onExpand?: () => void | Promise<void>;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  isExpanded = false,
  children,
  className = "",
  onExpand
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = async () => {
    if (!expanded && onExpand) {
      await onExpand();
    }
    setExpanded(!expanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`border border-custom-blue rounded-md ${className}`}>
      <button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="w-full p-3 bg-custom-blue text-white text-left flex justify-between items-center hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 min-h-touch"
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Ocultar' : 'Mostrar'} seção ${title}`}
      >
        <span className="font-medium">{title}</span>
        <span
          className={`transform transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
      
      {expanded && (
        <div className="p-4 bg-accessible-bg-primary border-t border-custom-blue">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;