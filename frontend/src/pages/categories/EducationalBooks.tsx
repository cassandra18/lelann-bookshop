import React, { useState } from 'react';
import CategoryHeader from '../../components/categories/categoryHeader';
import FilterPanel from '../../components/categories/books/filterPanel';
import { useCategoryData } from '../../components/categories/hooks/useCategoryData';
import { SelectedFilters } from '../../components/categories/api/bookService';
import ProductGrid from '../../components/categories/productGrid';
import Pagination from '../../components/categories/pagination';

const EducationalBooks: React.FC = () => {
  const { category_id, loading, error, totalPages, setTotalPages } = useCategoryData('Educational Books');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    author_ids: [],
    publisher_ids: [],
    subcategory_ids: [],
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const handleFilterChange = (filters: SelectedFilters) => {
    setSelectedFilters(filters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!category_id) return <div>Category not found</div>;

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-4">
      <CategoryHeader title="Educational Books" emoji="📚" />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
          <FilterPanel category_id={category_id} onFilterChange={handleFilterChange} />
          <div className="flex-1">
          <ProductGrid
            filters={selectedFilters}
            category_id={category_id}
            currentPage={currentPage}
            setTotalPages={setTotalPages}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EducationalBooks;
