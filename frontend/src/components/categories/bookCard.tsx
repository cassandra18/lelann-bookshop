import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  name: string;
  author?: { name: string } | null;
  price: number;
  oldPrice?: number | null;
  image: string;
  subcategoryId?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  name,
  author,
  price,
  oldPrice,
  image,
}) => {
  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">
      <Link to={`/books/${id}`}>
        <img
          src={`/uploads/${image}`}
          alt={name}
          className="w-full h-64 object-cover"
        />
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{name}</h3>
        {author?.name && (
          <p className="text-sm text-gray-500 mb-2">by {author.name}</p>
        )}

        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-green-600">Ksh {price.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">Ksh {oldPrice?.toFixed(2)}</span>
          )}
        </div>

        {hasDiscount && (
          <span className="inline-block mt-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
            -{discountPercent}% OFF
          </span>
        )}

        <Link
          to={`/books/${id}`}
          className="mt-4 inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-xl transition"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
