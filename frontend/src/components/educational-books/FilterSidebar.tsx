import React from "react";
import { BookFilters } from "../types/BookTypes";

interface FilterSidebarProps {
  filters: BookFilters;
  subcategories: { id: string; name: string }[];
  onChange: (newFilters: BookFilters) => void;
  onReset: () => void;
}

const conditions = [
  "NEW",
  "USED",
  "USED_GOOD",
  "USED_VERY_GOOD",
  "USED_ACCEPTABLE",
] as const;

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  subcategories,
  onChange,
  onReset,
}) => {
  const handleCheckboxChange = (
  type: keyof BookFilters,
  value: string | boolean
) => {
  const currentValue = filters[type];

  if (Array.isArray(currentValue)) {
    const typedArray = currentValue as string[];
    const typedValue = value as string;

    const updated = typedArray.includes(typedValue)
      ? typedArray.filter((v) => v !== typedValue)
      : [...typedArray, typedValue];

    onChange({ ...filters, [type]: updated });
  } else if (typeof currentValue === "boolean") {
    onChange({ ...filters, [type]: !currentValue });
  }
};



  const handlePriceChange = (field: "minPrice" | "maxPrice", value: string) => {
    const num = Number(value);
    if (!isNaN(num)) {
      onChange({ ...filters, [field]: num });
    }
  };

  return (
    <aside className="w-full md:w-64 bg-white p-4 border rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-prussian-blue">Filters</h2>

      {/* Subcategories */}
      <div className="mb-4">
        <h3 className="font-medium text-sm text-prussian-blue">Subcategories</h3>
        <div className="space-y-1 mt-2">
          {subcategories.map((sub) => (
            <label key={sub.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.subcategoryIds?.includes(sub.id) || false}
                onChange={() =>
                  handleCheckboxChange("subcategoryIds", sub.id)
                }
              />
              {sub.name}
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="mb-4">
        <h3 className="font-medium text-sm text-prussian-blue">Condition</h3>
        <div className="space-y-1 mt-2">
          {conditions.map((cond) => (
            <label key={cond} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.condition?.includes(cond) || false}
                onChange={() => handleCheckboxChange("condition", cond)}
              />
              {cond.replace("_", " ")}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h3 className="font-medium text-sm text-prussian-blue">Price Range</h3>
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
            className="w-full border px-2 py-1 rounded text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
            className="w-full border px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <h3 className="font-medium text-sm text-prussian-blue">Tags</h3>
        <div className="space-y-1 mt-2">
          {["featured", "bestseller", "newarrival", "promotion"].map((tag) => (
            <label key={tag} className="flex items-center gap-2 text-sm capitalize">
              <input
                type="checkbox"
                checked={(filters as any)[tag] || false}
                onChange={() =>
                  onChange({
                    ...filters,
                    [tag]: !(filters as any)[tag],
                  })
                }
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={onReset}
        className="mt-4 bg-yellow-300 text-prussian-blue font-semibold px-4 py-2 rounded w-full"
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
