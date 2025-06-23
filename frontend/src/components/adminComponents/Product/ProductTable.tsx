import { Book } from "../../types/BookTypes";
import { Link } from "react-router-dom";

interface Props {
  products: Book[];
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onDelete }: Props) {
  return (
    <table className="w-full text-left border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(book => (
          <tr key={book.id} className="border-t">
            <td className="p-2">
              <img
                src={book.image}
                alt={book.name}
                className="h-12 w-12 object-cover"
              />
            </td>
            <td>{book.name}</td>
            <td>{book.subcategory?.category?.name || "—"}</td>
            <td>Ksh {book.price}</td>
            <td>
              <Link
                to={`/admin/products/edit/${book.id}`}
                className="text-blue-500 mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(book.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
