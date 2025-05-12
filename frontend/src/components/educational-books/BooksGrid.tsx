import React from "react";
import { Book } from "../types/BookTypes";
import BookCard from "./BookCard"; // Import the BookCard component

interface BooksGridProps {
  books: Book[];
  loading?: boolean;
}

const BooksGrid: React.FC<BooksGridProps> = ({ books, loading = false }) => {
  if (loading) {
    return <div className="text-center py-10 text-prussian-blue">Loading books...</div>;
  }

  if (books.length === 0) {
    return <div className="text-center py-10 text-prussian-blue">No books found.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} /> // Use BookCard for each book
      ))}
    </div>
  );
};

export default BooksGrid;
