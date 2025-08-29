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
        totalPages, // Destructure totalPages from the hook
        setTotalPages,
    } = useCategoryData(categoryName);

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        subcategory_ids: [],
        author_ids: [],
        publisher_ids: [],
        company_ids: [],
    });

    const [currentPage, setCurrentPage] = useState<number>(1);

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
            <div className="flex flex-col md:flex-row gap-6 mt-6">
                <FilterPanel
                    category_id={category_id}
                    onFilterChange={handleFilterChange}
                />
                <div className="flex-1">
                    <ProductGrid
                        category_id={category_id}
                        filters={selectedFilters}
                        currentPage={currentPage}
                        setTotalPages={setTotalPages}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages} // Pass totalPages to the Pagination component
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;