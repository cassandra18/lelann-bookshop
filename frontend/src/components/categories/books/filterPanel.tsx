import React, { useEffect, useState } from "react";
import { fetchFilterOptions } from "../api/bookService";
import type { FilterOptions, SelectedFilters } from "../api/bookService";

interface FilterPanelProps {
  category_id: string;
  onFilterChange: (filters: SelectedFilters) => void;
}

// type FilterOption = {
//   id: string;
//   name: string;
// };

type FilterOptionGroup = {
  id: string;
  name: string;
  children?: FilterOptionGroup[];
};

const FilterPanel: React.FC<FilterPanelProps> = ({ category_id, onFilterChange }) => {
  const [filterData, setFilterData] = useState<FilterOptions>({
    authors: [],
    publishers: [],
    subcategories: [],
    companies: [],
    conditions: [],
    ageRanges: [],
    levels: [],
    subjects: [],
    editions: [],
    yearsPublished: [],
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    author_ids: [],
    publisher_ids: [],
    subcategory_ids: [],
    company_ids: [],
    condition_ids: [],
    ageRange_ids: [],
    level_ids: [],
    subject_ids: [],
    edition_ids: [],
    yearPublished_ids: [],
  });

  // State to manage the collapsed/expanded state of each filter group
  const [isAuthorsCollapsed, setIsAuthorsCollapsed] = useState(true);
  const [isPublishersCollapsed, setIsPublishersCollapsed] = useState(true);
  const [isSubcategoriesCollapsed, setIsSubcategoriesCollapsed] = useState(false);
  const [isCompaniesCollapsed, setIsCompaniesCollapsed] = useState(true);
  const [isConditionsCollapsed, setIsConditionsCollapsed] = useState(true);
  const [isAgeRangesCollapsed, setIsAgeRangesCollapsed] = useState(true);
  const [isLevelsCollapsed, setIsLevelsCollapsed] = useState(true);
  const [isSubjectsCollapsed, setIsSubjectsCollapsed] = useState(true);
  const [isEditionsCollapsed, setIsEditionsCollapsed] = useState(true);
  const [isYearsPublishedCollapsed, setIsYearsPublishedCollapsed] = useState(true);

  useEffect(() => {
    if (!category_id) return;

    const fetchFilters = async () => {
      try {
        const data = await fetchFilterOptions(category_id);
        const subcategories = Array.isArray(data.subcategories) ? data.subcategories : [];
        const flatData = {
          ...data,
          subcategories,
        };
        setFilterData(flatData);
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
      const current = Array.isArray(prev[type]) ? prev[type] : [];
      const updated = current.includes(id)
        ? current.filter((item: string) => item !== id)
        : [...current, id];
      return { ...prev, [type]: updated };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      author_ids: [],
      publisher_ids: [],
      subcategory_ids: [],
      company_ids: [],
      condition_ids: [],
      ageRange_ids: [],
      level_ids: [],
      subject_ids: [],
      edition_ids: [],
      yearPublished_ids: [],
    });
  };

  const renderOptions = (options: FilterOptionGroup[], type: string, depth: number = 0) => {
    return options.map((option) => {
      const hasChildren = option.children && option.children.length > 0;
      return (
        <div key={option.id} className={`flex flex-col ${depth > 0 ? "ml-4" : ""}`}>
          <div className="flex items-center hover:text-yellow-300 transition-colors duration-200 py-1">
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
          {hasChildren && renderOptions(option.children ?? [], type, depth + 1)}
        </div>
      );
    });
  };

  const renderFilterGroup = (
    label: string,
    type: string,
    options: FilterOptionGroup[],
    isCollapsed: boolean,
    toggleCollapse: () => void,
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
        filterData.subcategories,
        isSubcategoriesCollapsed,
        () => setIsSubcategoriesCollapsed(!isSubcategoriesCollapsed)
      )}
      {renderFilterGroup(
        "Publishers",
        "publisher_ids",
        filterData.publishers,
        isPublishersCollapsed,
        () => setIsPublishersCollapsed(!isPublishersCollapsed),
      )}
      {renderFilterGroup(
        "Age Range",
        "ageRange_ids",
        filterData.ageRanges,
        isAgeRangesCollapsed,
        () => setIsAgeRangesCollapsed(!isAgeRangesCollapsed),
      )}
      {renderFilterGroup(
        "Subject",
        "subject_ids",
        filterData.subjects,
        isSubjectsCollapsed,
        () => setIsSubjectsCollapsed(!isSubjectsCollapsed),
      )}
      {renderFilterGroup(
        "Level",
        "level_ids",
        filterData.levels,
        isLevelsCollapsed,
        () => setIsLevelsCollapsed(!isLevelsCollapsed),
      )}
      {renderFilterGroup(
        "Authors",
        "author_ids",
        filterData.authors,
        isAuthorsCollapsed,
        () => setIsAuthorsCollapsed(!isAuthorsCollapsed),
      )}
      {renderFilterGroup(
        "Companies",
        "company_ids",
        filterData.companies,
        isCompaniesCollapsed,
        () => setIsCompaniesCollapsed(!isCompaniesCollapsed),
      )}
      {renderFilterGroup(
        "Conditions",
        "condition_ids",
        filterData.conditions,
        isConditionsCollapsed,
        () => setIsConditionsCollapsed(!isConditionsCollapsed),
      )}
      {renderFilterGroup(
        "Edition",
        "edition_ids",
        filterData.editions,
        isEditionsCollapsed,
        () => setIsEditionsCollapsed(!isEditionsCollapsed),
      )}
      {renderFilterGroup(
        "Year Published",
        "yearPublished_ids",
        filterData.yearsPublished,
        isYearsPublishedCollapsed,
        () => setIsYearsPublishedCollapsed(!isYearsPublishedCollapsed),
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