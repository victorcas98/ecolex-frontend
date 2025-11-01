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
    <div className={`border border-accessible-border rounded-md ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="w-full p-3 bg-accessible-accent text-white hover:bg-accessible-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 min-h-touch font-medium [data-theme='high-contrast'] &:text-black"
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Ocultar' : 'Mostrar'} seção ${title}`}
      >
        <span className="flex justify-between items-center text-left w-full">
          <span>{title}</span>
          <span
            className={`transform transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            ▼
          </span>
        </span>
      </button>
      
      {expanded && (
        <div className="p-4 bg-accessible-bg-primary border-t border-accessible-border">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;