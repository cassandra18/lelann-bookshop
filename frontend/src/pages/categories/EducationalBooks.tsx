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
  const [priceSortOrder, setPriceSortOrder] = useState<string>('');

  const handleFilterChange = (filters: SelectedFilters) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handlePriceSortChange = (sortOrder: string) => {
    setPriceSortOrder(sortOrder);
    setCurrentPage(1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!category_id) return <div>Category not found</div>;

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-4">
      <CategoryHeader title="Educational Books" emoji="📚" />
      
      {/* Mobile-only controls for filters and sorting */}
      <div className="md:hidden flex items-center justify-between gap-4 mt-4">
        <button
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          className="flex-1 py-2 bg-slate-800 text-yellow-300 rounded-lg flex items-center justify-center space-x-2 font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <span>{isFilterPanelOpen ? "Hide Filters" : "Show Filters"}</span>
        </button>

        <select
          value={priceSortOrder}
          onChange={(e) => handlePriceSortChange(e.target.value)}
          className="flex-1 bg-slate-800 text-gray-300 p-2 rounded-lg text-sm"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Filter Panel (conditionally rendered) */}
        <div className={`w-full md:w-auto ${isFilterPanelOpen ? 'block' : 'hidden'} md:block`}>
          <FilterPanel category_id={category_id} onFilterChange={handleFilterChange} />
        </div>
        
        <div className="flex-1">
          {/* Price sorting dropdown for desktop */}
          <div className="hidden md:flex justify-end mb-4">
            <select
              value={priceSortOrder}
              onChange={(e) => handlePriceSortChange(e.target.value)}
              className="bg-slate-800 text-gray-300 p-2 rounded-lg text-sm md:text-base"
            >
              <option value="">Sort by Price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          <ProductGrid
            filters={selectedFilters}
            category_id={category_id}
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            priceSortOrder={priceSortOrder}
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