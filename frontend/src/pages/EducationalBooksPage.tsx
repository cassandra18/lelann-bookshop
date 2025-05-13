import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useEducationalBooks from "../components/educational-books/useEducationalBooks";
import FiltersSidebar from "../components/educational-books/FilterSidebar";
import BooksGrid from "../components/educational-books/BooksGrid";
import Pagination from "../components/common/Pagination";

const EducationalBooks: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("relevance");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { filteredBooks, subcategories, loading, error } = useEducationalBooks(subcategoryId, sortOption);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex max-w-7xl mx-auto">
      <FiltersSidebar subcategories={subcategories} />
      <div className="w-3/4 mb-32">
        <h1 className="text-3xl font-bold text-center mt-10 text-sunset">Educational Books</h1>

        {/* Sorting */}
        <div className="flex justify-end gap-4 mb-4 mr-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded p-1"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="popularity">Most Popular</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded p-1"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={60}>60 per page</option>
          </select>
        </div>

        <BooksGrid books={displayedBooks} />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default EducationalBooks;
