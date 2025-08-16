import { useState, useEffect } from 'react';
import { Book, BookFormData } from '../../components/types/BookTypes';
import {
  createProduct,
  updateProduct,
  fetchProduct,
  fetchProducts,
  deleteProduct,
} from '../../components/adminComponents/Product/ProductActions';
import BookForm from '../../components/adminComponents/Product/ProductForm';
import BooksManagement from '../../components/adminComponents/booksManagement';

const ProductPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const books = await fetchProducts();
      setProducts(books);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    } finally {
      setLoading(false);
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

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleSave = async (data: BookFormData, imageFile: File | null) => {
    setIsSubmitting(true);
    try {
      const product: Partial<Book> = {
        ...data,
        price: data.price,
        oldPrice: data.oldPrice ? data.oldPrice : 0,
      };

      if (editingBook) {
        await updateProduct(editingBook.id, product, imageFile);
      } else {
        await createProduct(product, imageFile);
      }

      await loadProducts();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save product:", error);
      throw error;
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
        <BooksManagement
          books={products}
          loading={loading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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