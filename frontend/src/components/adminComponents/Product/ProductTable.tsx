import { Book } from "../../types/BookTypes";

interface Props {
  products: Book[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function ProductTable({ products, onDelete, onEdit }: Props) {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-[#1e87b5] text-white uppercase text-md">
        <tr>
          <th className="p-3 text-left">Image</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-400">
        {products.map((book) => (
          <tr key={book.id} className="hover:bg-gray-100 transition">
            <td className="p-3">
              <img
                src={book.image}
                alt={book.name}
                className="h-12 w-12 rounded object-cover border"
              />
            </td>
            <td className="p-3 font-medium">{book.name}</td>
            <td className="p-3">{book.subcategory?.category?.name || "—"}</td>
            <td className="p-3">Ksh {book.price}</td>
            <td className="p-3 align-middle">
              <div className="flex flex-col md:flex-row items-center justify-around gap-2 md:gap-4">
                <button
                  onClick={() => onEdit(book.id)}
                  className="text-[#1e87b5] hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(book.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
