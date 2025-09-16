import React, { useEffect, useState } from "react";
import BookCard from "./productCard";
import { Product, SelectedFilters, fetchProducts } from "./api/bookService";

export interface ProductGridProps {
    category_id: string;
    filters: SelectedFilters;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>; // Prop to update total pages
    currentPage: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
    filters, 
    category_id, 
    currentPage, 
    setTotalPages 
}) => {
  const [books, setBooks] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts(category_id, filters, currentPage);
        
        if (!response.products || !Array.isArray(response.products)) {
            throw new Error("API response is not in the expected format.");
        }
        setBooks(response.products);
        
        setTotalPages(response.totalPages);
        
      } catch (err) {
        console.error("Failed to fetch books", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, [filters, category_id, currentPage, setTotalPages]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading products...</p>;
  if (books.length === 0) return <p className="text-center text-gray-500 mt-10">No products found.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-6 mt-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          name={book.name}
          author={book.author}
          price={book.price}
          oldPrice={book.oldPrice}
          image={book.image}
        />
      ))}
    </div>
  );
};

export default ProductGrid;