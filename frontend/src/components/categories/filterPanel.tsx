import React, { useEffect, useState } from "react";
import { fetchFilterOptions } from "./api/bookService";
import type { FilterOptions, SelectedFilters } from "./api/bookService";

interface FilterPanelProps {
  category_id: string;
  onFilterChange: (filters: SelectedFilters) => void;
}

// You can define this locally
type FilterOption = {
  id: string;
  name: string;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ category_id, onFilterChange }) => {
  const [filterData, setFilterData] = useState<FilterOptions>({
    authors: [],
    publishers: [],
    subcategories: [],
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    authorIds: [],
    publisherIds: [],
    subcategoryIds: [],
  });

  useEffect(() => {
    if (!category_id) return;

    const fetchFilters = async () => {
      try {
        const data = await fetchFilterOptions(category_id);
        setFilterData(data);
      } catch (error) {
        console.error("Failed to load filters:", error);
      }
    };

    fetchFilters();
  }, [category_id]);

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

const handleCheckboxChange = (
  type: "authorIds" | "publisherIds" | "subcategoryIds",
  id: string
) => {
  setSelectedFilters((prev) => {
    const current = prev[type] ?? [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    return { ...prev, [type]: updated };
  });
};


  const renderFilterGroup = (
    label: string,
    type: "authorIds" | "publisherIds" | "subcategoryIds",
    options: FilterOption[]
  ) => (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{label}</h3>
      {options.map((option) => (
        <div key={option.id} className="flex items-center mb-1">
          <input
            type="checkbox"
            id={`${type}-${option.id}`}
            checked={selectedFilters[type]?.includes(option.id) || false}
            onChange={() => handleCheckboxChange(type, option.id)}
            className="mr-2"
          />
          <label htmlFor={`${type}-${option.id}`}>{option.name}</label>
        </div>
      ))}
    </div>
  );

  return (
    <aside className="w-full md:w-64 bg-white p-4 border rounded shadow-sm">
      {renderFilterGroup("Authors", "authorIds", filterData.authors)}
      {renderFilterGroup("Publishers", "publisherIds", filterData.publishers)}
      {renderFilterGroup("Subcategories", "subcategoryIds", filterData.subcategories)}
    </aside>
  );
};

export default FilterPanel;
