import React from 'react';
import { Book } from "../../types/BookTypes";
import ProductTable from "./ProductTable";
import { Search } from "lucide-react";

type ProductListProps = {
  products: Book[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAdd,
  onEdit,
  onDelete,
  loading
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.author?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (product.publisher?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (product.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="min-h-screen md:p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="md:text-4xl text-2xl font-bold text-yellow-300 tracking-tight">
            📚 Product Management
          </h1>
          <button
            onClick={onAdd}
            className="bg-yellow-100 text-[#001D29] font-semibold md:px-5 px-2 md:py-2 rounded-full shadow hover:bg-yellow-300 transition"
          >
            + Add Product
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="bg-gray-300 rounded-lg shadow-lg overflow-x-auto">
          {loading ? (
            <div className="text-center text-gray-700 py-12">
              <p className="text-lg font-medium">Loading products...</p>
              <p className="text-sm text-gray-600 mt-2">Please wait a moment.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-700 py-12">
              <p className="text-lg font-medium">No products found.</p>
              <p className="text-sm text-gray-600 mt-2">Start by adding a new product.</p>
            </div>
          ) : (
            <ProductTable
              products={filteredProducts}
              onDelete={handleDelete}
              onEdit={onEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;