import React, { useEffect, useState } from "react";
import { fetchFilterOptions } from "./api/bookService";
import type { FilterOptions, SelectedFilters } from "./api/bookService";

interface FilterPanelProps {
  category_id: string;
  onFilterChange: (filters: SelectedFilters) => void;
}

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
    author_ids: [],
    publisher_ids: [],
    subcategory_ids: [],
  });

  // State to manage the collapsed/expanded state of each filter group
  const [isAuthorsCollapsed, setIsAuthorsCollapsed] = useState(false);
  const [isPublishersCollapsed, setIsPublishersCollapsed] = useState(false);
  const [isSubcategoriesCollapsed, setIsSubcategoriesCollapsed] = useState(false);

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
  type: "author_ids" | "publisher_ids" | "subcategory_ids",
  id: string
) => {
  setSelectedFilters((prev) => {
    const current = prev[type] ?? [];
    const updated = current.includes(id)
      ? current.filter((item: string) => item !== id)
      : [...current, id];

    return { ...prev, [type]: updated };
  });
};

  // Resets all selected filters to empty arrays
  const handleClearFilters = () => {
    setSelectedFilters({
      author_ids: [],
      publisher_ids: [],
      subcategory_ids: [],
    });
  };

  const renderFilterGroup = (
    label: string,
    type: "author_ids" | "publisher_ids" | "subcategory_ids",
    options: FilterOption[],
    isCollapsed: boolean,
    toggleCollapse: () => void
  ) => (
    <div className="mb-6 last:mb-0 border-b border-gray-700 pb-4 last:border-b-0"> 
      <div
        className="flex justify-between items-center cursor-pointer text-yellow-300 hover:text-blue-300 transition-colors duration-200"
        onClick={toggleCollapse}
      >
        <h3 className="font-bold text-lg">{label}</h3>
        {/* Arrow icon indicating collapsed/expanded state */}
        <span className="text-xl">
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </div>
      {!isCollapsed && (
        <div className="mt-3 space-y-2"> {/* Adds space between checkboxes */}
          {options.map((option) => (
            <div key={option.id} className="flex items-center hover:text-yellow-300 transition-colors duration-200">
              <input
                type="checkbox"
                id={`${type}-${option.id}`}
                checked={selectedFilters[type]?.includes(option.id) || false}
                onChange={() => handleCheckboxChange(type, option.id)}
                className="mr-3 w-3 h-3 accent-blue-400 cursor-pointer rounded-sm" // Accent color for checkbox
              />
              <label htmlFor={`${type}-${option.id}`} className="text-base cursor-pointer">
                {option.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );


  return (
    <aside className="w-full md:w-64 p-6  text-white rounded-xl shadow-2xl font-inter">
      <h2 className="text-2xl font-bold mb-6 text-yellow-300">Filters</h2>

      {renderFilterGroup(
        "Authors",
        "author_ids",
        filterData.authors,
        isAuthorsCollapsed,
        () => setIsAuthorsCollapsed(!isAuthorsCollapsed)
      )}
      {renderFilterGroup(
        "Publishers",
        "publisher_ids",
        filterData.publishers,
        isPublishersCollapsed,
        () => setIsPublishersCollapsed(!isPublishersCollapsed)
      )}
      {renderFilterGroup(
        "Subcategories",
        "subcategory_ids",
        filterData.subcategories,
        isSubcategoriesCollapsed,
        () => setIsSubcategoriesCollapsed(!isSubcategoriesCollapsed)
      )}

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="mt-8 w-full py-3 bg-yellow-200 text-prussian-blue hover:bg-yellow-400 transition-colors duration-300 rounded-full font-semibold shadow-md"
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default FilterPanel;
