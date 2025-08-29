import React, { useEffect, useState } from "react";
import { fetchFilterOptions } from "./api/bookService";
import type { FilterOptions, SelectedFilters } from "./api/bookService";

interface FilterPanelStationeryProps {
  category_id: string;
  onFilterChange: (filters: SelectedFilters) => void;
}

type FilterOptionGroup = {
  id: string;
  name: string;
  children?: FilterOptionGroup[];
};

const FilterPanel: React.FC<FilterPanelStationeryProps> = ({ category_id, onFilterChange }) => {
  const [filterData, setFilterData] = useState<FilterOptions>({
    companies: [],
    subcategories: [],
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    company_ids: [],
    subcategory_ids: [],
  });

  const [isCompaniesCollapsed, setIsCompaniesCollapsed] = useState(false);
  const [isSubcategoriesCollapsed, setIsSubcategoriesCollapsed] = useState(false);

  // State to manage the collapsed state of individual nested subcategories
  const [collapsedSubcategories, setCollapsedSubcategories] = useState<Record<string, boolean>>({});

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

  const handleCheckboxChange = (type: string, id: string) => {
    setSelectedFilters((prev) => {
      const current = (prev[type] as string[] | undefined) || [];
      const updated = current.includes(id) ? current.filter((item: string) => item !== id) : [...current, id];
      return { ...prev, [type]: updated };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      company_ids: [],
      subcategory_ids: [],
    });
  };

  // Function to toggle the collapse state of a specific subcategory
  const toggleSubcategoryCollapse = (id: string) => {
    setCollapsedSubcategories(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  // Recursive function to render nested filter options with collapse functionality
  const renderOptions = (options: FilterOptionGroup[], type: string, depth: number = 0) => {
    return options.map((option) => {
      const hasChildren = option.children && option.children.length > 0;
      const isCollapsed = collapsedSubcategories[option.id];

      return (
        <div key={option.id} className={`flex flex-col ${depth > 0 ? "ml-4" : ""}`}>
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center hover:text-yellow-300 transition-colors duration-200">
              <input
                type="checkbox"
                id={`${type}-${option.id}`}
                checked={(selectedFilters[type] as string[] | undefined)?.includes(option.id) || false}
                onChange={() => handleCheckboxChange(type, option.id)}
                className="mr-3 w-3 h-3 accent-blue-400 cursor-pointer rounded-sm"
              />
              <label htmlFor={`${type}-${option.id}`} className="text-base cursor-pointer">
                {option.name}
              </label>
            </div>
            {hasChildren && (
              <span 
                className="text-xl cursor-pointer text-yellow-100 hover:text-blue-300 transition-colors duration-200 ml-2"
                onClick={() => toggleSubcategoryCollapse(option.id)}
              >
                {isCollapsed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </span>
            )}
          </div>
          {hasChildren && !isCollapsed && (
            // Recursively call renderOptions for nested children
            renderOptions(option.children!, type, depth + 1)
          )}
        </div>
      );
    });
  };

  const renderFilterGroup = (
    label: string,
    type: string,
    options: FilterOptionGroup[],
    isCollapsed: boolean,
    toggleCollapse: () => void
  ) => (
    <div className="mb-6 last:mb-0 border-b border-gray-700 pb-4 last:border-b-0">
      <div
        className="flex justify-between items-center cursor-pointer text-yellow-300 hover:text-blue-300 transition-colors duration-200"
        onClick={toggleCollapse}
      >
        <h3 className="font-bold text-lg">{label}</h3>
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
        <div className="mt-3 space-y-2">
          {renderOptions(options, type)}
        </div>
      )}
    </div>
  );

  return (
    <aside className="w-full md:w-64 p-6 text-white rounded-xl shadow-2xl font-inter">
      {renderFilterGroup(
        "Subcategories",
        "subcategory_ids",
        filterData.subcategories || [],
        isSubcategoriesCollapsed,
        () => setIsSubcategoriesCollapsed(!isSubcategoriesCollapsed)
      )}
      {renderFilterGroup(
        "Companies",
        "company_ids",
        filterData.companies || [],
        isCompaniesCollapsed,
        () => setIsCompaniesCollapsed(!isCompaniesCollapsed)
      )}
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