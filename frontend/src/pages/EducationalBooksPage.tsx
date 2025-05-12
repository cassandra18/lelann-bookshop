import React, { useState, useEffect } from "react";
import useEducationalBooks from "../components/educational-books/useEducationalBooks";
import { BookFilters, Subcategory } from "../components/types/BookTypes";
import BooksGrid from "../components/educational-books/BooksGrid";
import Pagination from "../components/common/Pagination";
import FilterSidebar from "../components/educational-books/FilterSidebar";

const EducationalBooksPage: React.FC = () => {
  const [filters, setFilters] = useState<BookFilters>({});
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]); // Add subcategories state
  const [page, setPage] = useState(1);

  const { books, loading, totalPages } = useEducationalBooks(filters, page);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await fetch("/api/subcategories");
      const data = await response.json();
      setSubcategories(data);
    };

    fetchSubcategories();
  }, []);

  const handleFilterChange = (newFilters: BookFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="flex flex-col md:flex-row">
      <FilterSidebar
        filters={filters}
        onChange={handleFilterChange}
        subcategories={subcategories} // Pass subcategories to FilterSidebar
        onReset={handleResetFilters}  // Pass onReset function
      />
      <div className="flex-1">
        <BooksGrid books={books} loading={loading} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default EducationalBooksPage;
