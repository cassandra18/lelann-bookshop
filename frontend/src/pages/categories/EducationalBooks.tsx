import React, { useState } from 'react';
import CategoryHeader from '../../components/categories/CategoryHeader';
import SubcategoryCards from '../../components/categories/SubcategoryCards';
import FilterPanel from '../../components/categories/filterPanel';
import { useSubcategories } from '../../components/categories/hooks/useSubcategories';
import { SelectedFilters } from '../../components/categories/api/bookService';
import BookGrid from '../../components/categories/bookGrid';

const EducationalBooks: React.FC = () => {
  const { subcategories, categoryId, loading, error } = useSubcategories('Educational Books');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    authorIds: [],
    publisherIds: [],
    subcategoryIds: [],
  });

  const handleFilterChange = (filters: SelectedFilters) => {
    setSelectedFilters(filters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!categoryId) return <div>Category ID not found</div>;

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-4">
      <CategoryHeader title="Educational Books" />
      <SubcategoryCards subcategories={subcategories} />
      
      <div className="flex flex-col md:flex-row gap-6 mt-6">
          <FilterPanel category_id={categoryId} onFilterChange={handleFilterChange} />
          <BookGrid filters={selectedFilters} categoryId={categoryId} />
      </div>
    </div>
  );
};

export default EducationalBooks;
