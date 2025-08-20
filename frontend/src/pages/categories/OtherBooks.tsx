import React, { useState } from 'react';
import CategoryHeader from '../../components/categories/CategoryHeader';
import FilterPanel from '../../components/categories/filterPanel';
import { useSubcategories } from '../../components/categories/hooks/useSubcategories';
import { SelectedFilters } from '../../components/categories/api/bookService';
import BookGrid from '../../components/categories/bookGrid';

const OtherBooks: React.FC = () => {
  const { category_id, loading, error } = useSubcategories('Other Books');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    author_ids: [],
    publisher_ids: [],
    subcategory_ids: [],
  });

  const handleFilterChange = (filters: SelectedFilters) => {
    setSelectedFilters(filters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!category_id) return <div>Category ID not found</div>;

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-4">
      <CategoryHeader title="Other Books" />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
          <FilterPanel category_id={category_id} onFilterChange={handleFilterChange} />
          <BookGrid filters={selectedFilters} category_id={category_id} />
      </div>
    </div>
  );
};

export default OtherBooks;
