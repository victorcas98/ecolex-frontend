import React, { useState, useRef, useEffect } from 'react';

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
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedItem,
  onSelect,
  isClickable = false,
  clickAction = () => {},
  clickText,
  placeholder = "Selecione um item",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemSelect = (item: DropdownItem) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className={"relative"} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-white border border-custom-blue rounded-md text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span>{selectedItem ? selectedItem.label : placeholder}</span>
        <span className={`text-custom-green transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-custom-blue rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="px-3 py-2 ">
            {isClickable && (
              <li className='text-custom-green'>
              <button
                onClick={clickAction}
              >
                {clickText}
              </button>
            </li>)}
            {items.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() => handleItemSelect(item)}
                  className="w-full px-3 py-2 text-left hover:bg-custom-light-blue transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;