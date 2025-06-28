import { useState, useEffect } from 'react';
import ProductList from '../../components/adminComponents/Product/ProductList';
import BookForm from '../../components/adminComponents/Product/ProductForm';
import { Book, BookFormData } from '../../components/types/BookTypes';
import {
  createProduct,
  updateProduct,
  fetchProduct,
  fetchProducts,
} from '../../components/adminComponents/Product/ProductActions';

const ProductPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<Book[]>([]);

  // Load all books on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const books = await fetchProducts();
      setProducts(books);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  const handleAdd = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEdit = async (bookId: string) => {
    try {
      const book = await fetchProduct(bookId);
      setEditingBook(book);
      setShowForm(true);
    } catch (error) {
      console.error("Failed to fetch book:", error);
    }
  };

  const handleSave = async (data: BookFormData, imageFile: File | null) => {
    setIsSubmitting(true);
    try {
      const product: Partial<Book> = {
        ...data,
        price: parseFloat(data.price),
        oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : undefined,
        discount: data.discount ? parseFloat(data.discount) : undefined,
      };

      if (editingBook) {
        await updateProduct(editingBook.id, product, imageFile);
      } else {
        await createProduct(product, imageFile);
      }

      await loadProducts(); // Refresh list
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="md:p-6">
      {!showForm ? (
        <ProductList products={products} onAdd={handleAdd} onEdit={handleEdit} />
      ) : (
        <BookForm
          book={editingBook}
          onClose={handleCloseForm}
          onSave={handleSave}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default ProductPage;
