import React from "react";
import { EducationalBook } from "./useEducationalBooks";
import { useCart } from "../cart-functionality";
import { Link } from "react-router-dom";

interface Props {
  books: EducationalBook[];
}

const BooksGrid: React.FC<Props> = ({ books }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (book: EducationalBook) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: book.id,
        name: book.name,
        price: book.price,
        quantity: 1,
        image: book.image,
      },
    });
    alert(`Added ${book.name} to basket`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-4 pt-4">
      {books.map((book) => (
        <div key={book.id} className="rounded shadow bg-white p-2 flex flex-col hover:scale-95 transition">
          <Link to={`/educational-books/${book.id}`}>
            <img src={book.image} alt={book.name} className="h-36 mx-auto" />
            <div className="mt-2">
              <h3 className="text-prussian-blue font-semibold">{book.name}</h3>
              <p className="text-sm text-gray-600">{book.author?.name || "Unknown Author"}</p>
              <p className="text-md font-semibold text-prussian-blue">KES {book.price}</p>
            </div>
          </Link>
          <button
            onClick={() => handleAddToCart(book)}
            className="mt-auto bg-gray-400 hover:bg-yellow-500 text-white p-2"
          >
            {book.cta}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BooksGrid;
