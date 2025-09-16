import React, { useState } from 'react';
import CategoryHeader from './categoryHeader';
import FilterPanel from './filterPanel';
import ProductGrid from './productGrid';
import Pagination from './pagination';
import { SelectedFilters } from './api/bookService';
import { useCategoryData } from './hooks/useCategoryData';

interface CategoryPageProps {
    categoryName: string;
    emoji: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName, emoji }) => {
    const {
        category_id,
        loading,
        error,
        totalPages,
        setTotalPages,
    } = useCategoryData(categoryName);

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        subcategory_ids: [],
        author_ids: [],
        publisher_ids: [],
        company_ids: [],
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);

    const handleFilterChange = (filters: SelectedFilters) => {
        setSelectedFilters(filters);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!category_id) return <div>Category not found</div>;

    return (
        <div className="px-4 sm:px-8 lg:px-16 py-4">
            <CategoryHeader title={categoryName} emoji={emoji} />
            
            {/* Toggle button for filters on small screens */}
            <div className="md:hidden mt-4">
                <button
                    onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                    className="p-2 bg-slate-800 text-yellow-300 rounded-lg flex items-center justify-center space-x-2 font-bold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <span>{isFilterPanelOpen ? "Hide Filters" : "Show Filters"}</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6">
                {/* Filter panel is visible on medium screens and up, or when toggled on small screens */}
                <div className={`w-full md:w-auto ${isFilterPanelOpen ? 'block' : 'hidden'} md:block`}>
                    <FilterPanel
                        category_id={category_id}
                        onFilterChange={handleFilterChange}
                    />
                </div>
                
                <div className="flex-1">
                    <ProductGrid
                        category_id={category_id}
                        filters={selectedFilters}
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

export default CategoryPage;