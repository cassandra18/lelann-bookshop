import React from "react";
import { Book } from "../types/BookTypes";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-3 hover:shadow-lg transition">
      <img
        src={book.image}
        alt={book.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-2">
        <h3 className="text-prussian-blue font-semibold text-sm line-clamp-2">
          {book.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {book.author?.name} • {book.subject}
        </p>
        <p className="text-yellow-600 text-sm font-medium mt-1">
          Ksh {book.price.toFixed(2)}
          {book.oldPrice && (
            <span className="line-through text-gray-400 ml-2">
              Ksh {book.oldPrice.toFixed(2)}
            </span>
          )}
        </p>
        <p className="text-xs text-gray-600 mt-1 capitalize">
          Condition: {book.condition.toLowerCase().replace(/_/g, " ")}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
