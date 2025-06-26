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
    <div className="p-6 bg-slate-400">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductTable products={products} onDelete={handleDelete} onEdit={onEdit} />
      )}
    </div>
  );
};

export default ProductList;
