import React, { useEffect, useState } from "react";
import BookCard from "./bookCard";
import { Product, SelectedFilters, fetchProducts } from "./api/bookService";

interface BookGridProps {
  filters: SelectedFilters;
  categoryId: string;
}

const BookGrid: React.FC<BookGridProps> = ({ filters, categoryId }) => {
  const [books, setBooks] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const fetched = await fetchProducts(categoryId, filters);
        if (!fetched?.products) throw new Error("No products in response");
        setBooks(fetched.products);
      } catch (err) {
        console.error("Failed to fetch books", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, [filters, categoryId]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading books...</p>;
  if (books.length === 0) return <p className="text-center text-gray-500 mt-10">No books found.</p>;

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

export default BookGrid;
