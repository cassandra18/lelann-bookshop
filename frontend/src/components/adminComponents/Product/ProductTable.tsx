import React from "react";
import { Book } from "../../types/BookTypes"; // Assuming BookTypes is correctly defined

type ProductTableProps = {
  products: Book[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 bg-white">
      <thead className="bg-lapis text-white"> {/* Darker background for header */}
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">ID</th>
          <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider">Image</th>
          <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
          <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Author</th>
          <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Publisher</th>
          <th className="px-4 py-3 text-right text-sm font-semibold uppercase tracking-wider">Price</th>
          <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider rounded-tr-lg">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {Array.isArray(products) && products.map((book, index) => (
          <tr key={book.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200 ease-in-out`}> {/* Alternating row colors */}
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-bold">{index  + 1}</td>
            <td className="px-4 py-3 whitespace-nowrap text-center">
              <img
                src={book.image || '[https://placehold.co/40x40/E0E0E0/808080?text=No+Img](https://placehold.co/40x40/E0E0E0/808080?text=No+Img)'} // Placeholder for missing image
                alt={book.name}
                className="h-10 w-10 object-cover rounded-md mx-auto border border-gray-200"
                onError={(e) => { e.currentTarget.src = '[https://placehold.co/40x40/E0E0E0/808080?text=No+Img](https://placehold.co/40x40/E0E0E0/808080?text=No+Img)'; }} // Fallback image on error
              />
            </td>
            <td className="px-4 py-3 text-left font-medium text-gray-900">{book.name}</td>
            <td className="px-4 py-3 text-left text-gray-700">{book.author?.name || "—"}</td>
            <td className="px-4 py-3 text-left text-gray-700">{book.publisher?.name || "—"}</td>
            <td className="px-4 py-3 text-right text-gray-700">Ksh {book.price?.toFixed(2)}</td> {/* Format price */}
            <td className="px-4 py-3 whitespace-nowrap text-center">
              <button
                className="mr-2 px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                onClick={() => onEdit(book.id)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                onClick={() => onDelete(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {!products.length && (
            <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-600 text-lg">
                    No products to display.
                </td>
            </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
