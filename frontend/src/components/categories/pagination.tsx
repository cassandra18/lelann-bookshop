import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Create an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {/* Previous button */}
        <li>
          <button
            className="px-3 py-1 border border-gray-300 rounded"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-1 border border-gray-300 rounded ${
                page === currentPage ? "bg-selective-yellow text-white" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next button */}
        <li>
          <button
            className="px-3 py-1 border border-gray-300 rounded"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
