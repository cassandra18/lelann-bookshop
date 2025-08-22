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
   <div className="bg-white shadow-md rounded-2xl overflow-hidden transform  transition-transform duration-300 hover:scale-105 flex flex-col h-64">
  <div className="relative">
    <Link to={`/books/${id}`}>
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
      />
    </Link>

    {hasDiscount && (
      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm z-10">
        {discountPercent}% OFF
      </span>
    )}
  </div>

  <div className="flex flex-col flex-1 p-2">
    <h3 className=" font-semibold text-gray-800 line-clamp-2">{name}</h3>
    {author?.name && (
      <p className="text-sm text-gray-500 mb-2">by {author.name}</p>
    )}

    <div className="flex items-center space-x-2 mb-2">
      <span className=" font-bold text-green-600">Ksh {price.toFixed(2)}</span>
      {hasDiscount && (
        <span className="text-sm text-gray-400 line-through">Ksh {oldPrice?.toFixed(2)}</span>
      )}
    </div>
    <Link
      to={`/books/${id}`}
      className="mt-auto inline-block w-full text-center text-prussian-blue bg-yellow-200 hover:bg-yellow-300 text-sm font-semibold py-1 rounded-xl transition"
    >
      Buy Now
    </Link>
  </div>
</div>

  );
};

export default BookCard;
