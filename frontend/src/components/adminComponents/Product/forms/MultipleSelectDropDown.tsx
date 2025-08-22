import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  id: string;
  name: string;
}

interface MultiSelectDropdownProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (selectedIds: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (id: string) => {
    const updatedValues = selectedValues.includes(id)
      ? selectedValues.filter((value) => value !== id)
      : [...selectedValues, id];
    onChange(updatedValues);
  };

  const getSelectedNames = () => {
    if (selectedValues.length === 0) {
      return `Select ${label}`;
    }
    const names = options
      .filter((option) => selectedValues.includes(option.id))
      .map((option) => option.name);
    return names.join(", ");
  };

  return (
    <div className="relative col-span-1 md:col-span-2" ref={dropdownRef}>
      <button
        type="button"
        className="flex justify-between items-center bg-gray-300 text-gray-700 rounded px-3 py-2 w-full focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{getSelectedNames()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-200 border border-gray-400 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option) => (
              <label key={option.id} className="flex items-center p-2 hover:bg-gray-300 cursor-pointer text-gray-800">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.id)}
                  onChange={() => handleCheckboxChange(option.id)}
                  className="mr-2 accent-blue-500"
                />
                {option.name}
              </label>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;