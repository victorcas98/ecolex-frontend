import React, { useState, useRef, useEffect } from "react";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  items: DropdownItem[];
  selectedItem?: DropdownItem;
  onSelect: (item: DropdownItem) => void;
  placeholder?: string;
  isClickable?: boolean;
  clickText?: string;
  clickAction?: () => void;
  theme?: "primary" | "registerNewTheme";
  clickTextPlaceholder?: string;
  clickTextOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  theme,
  items,
  selectedItem,
  onSelect,
  isClickable = false,
  clickAction = () => {},
  clickText,
  placeholder = "Selecione um item",
  clickTextPlaceholder = "Clique aqui",
  clickTextOnChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemSelect = (item: DropdownItem) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className={"relative"} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-1 bg-accessible-bg-primary border border-accessible-border rounded-md text-left flex justify-between items-center hover:bg-accessible-bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accessible-focus focus:ring-offset-2 min-h-touch"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={selectedItem ? `Selecionado: ${selectedItem.label}` : placeholder}
      >
        <span className="text-accessible-text-primary">{selectedItem ? selectedItem.label : placeholder}</span>
        <span
          className={`text-accessible-accent transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-accessible-bg-primary border border-accessible-border rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="px-3 py-1" role="menu" aria-label={`Opções para ${placeholder}`}>
            {isClickable && (
              <div className="text-accessible-accent mb-2">
                {theme === "registerNewTheme" && (
                  <label htmlFor="dropdown-input" className="sr-only">
                    Nome do novo tema
                  </label>
                )}
                {theme === "registerNewTheme" && (
                  <input
                    id="dropdown-input"
                    value={clickText}
                    onChange={clickTextOnChange}
                    placeholder="digite o nome do seu novo tema"
                    type="text"
                    className="w-full p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-accessible-focus text-accessible-text-primary bg-accessible-bg-primary border border-accessible-border"
                    aria-label="Nome do novo tema"
                  />
                )}
                <button 
                  type="button"
                  onClick={clickAction}
                  className="w-full px-3 py-2 text-left hover:bg-accessible-bg-secondary transition-colors text-accessible-accent"
                  aria-label={clickTextPlaceholder}
                  role="menuitem"
                >
                  {clickTextPlaceholder}
                </button>
              </div>
            )}
            {items.map((item) => (
              <button
                type="button"
                key={item.value}
                onClick={() => handleItemSelect(item)}
                className="w-full px-3 py-2 text-left hover:bg-accessible-bg-secondary transition-colors text-accessible-text-primary block"
                aria-label={`Selecionar ${item.label}`}
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
