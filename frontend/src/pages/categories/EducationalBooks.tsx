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
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);

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
      
      {/* Hamburger menu button for mobile */}
      <div className="md:hidden mt-4">
        <button
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          className="p-2 bg-slate-800 text-yellow-300 rounded-lg flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <span>{isFilterPanelOpen ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Filter Panel (conditionally rendered) */}
        <div className={`md:block ${isFilterPanelOpen ? 'block' : 'hidden'}`}>
          <FilterPanel category_id={category_id} onFilterChange={handleFilterChange} />
        </div>
        
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