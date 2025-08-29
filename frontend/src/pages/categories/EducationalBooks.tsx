import React, { useState } from 'react';
import CategoryHeader from '../../components/categories/categoryHeader';
import FilterPanel from '../../components/categories/books/filterPanel';
import { useSubcategories } from '../../components/categories/hooks/useSubcategories';
import { SelectedFilters } from '../../components/categories/api/bookService';
import ProductGrid from '../../components/categories/productGrid';

const EducationalBooks: React.FC = () => {
  const { category_id, loading, error } = useSubcategories('Educational Books');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    author_ids: [],
    publisher_ids: [],
    subcategory_ids: [],
  });

  const handleFilterChange = (filters: SelectedFilters) => {
    setSelectedFilters(filters);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!category_id) return <div>Category ID not found</div>;

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-4">
      <CategoryHeader title="Educational Books" emoji="📚" />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
          <FilterPanel category_id={category_id} onFilterChange={handleFilterChange} />
          <ProductGrid
            filters={selectedFilters}
            category_id={category_id}
            currentPage={currentPage}
            setTotalPages={setTotalPages}
          />
      </div>
    </div>
  );
};

export default EducationalBooks;
