import { useEffect, useState } from "react";
import { Book } from "../../types/BookTypes";
import { fetchProducts, deleteProduct } from "./ProductActions";
import ProductTable from "./ProductTable";

type ProductListProps = {
  onAdd: () => void;
  onEdit: (id: string) => void;
};

const ProductList: React.FC<ProductListProps> = ({ onAdd, onEdit }) => {
  const [products, setProducts] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(b => b.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="min-h-screen  md:p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="md:text-4xl text-2xl font-bold text-yellow-300 tracking-tight">📚 Product Management</h1>
          <button
            onClick={onAdd}
            className="bg-yellow-100 text-[#001D29] font-semibold md:px-5 px-2 md:py-2 rounded-full shadow hover:bg-yellow-300 transition "
          >
            + Add Product
          </button>
        </div>

        <div className="bg-gray-300 rounded-lg shadow-lg p-4 overflow-x-auto">
          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : (
            <ProductTable products={products} onDelete={handleDelete} onEdit={onEdit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
