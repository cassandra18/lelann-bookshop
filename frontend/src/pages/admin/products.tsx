import { useState } from 'react';
import ProductList from '../../components/adminComponents/Product/ProductList';
import BookForm from '../../components/adminComponents/Product/ProductForm';
import { Book } from '../../components/types/BookTypes';
import { BookFormData } from '../../components/types/BookTypes';
import { createProduct, updateProduct, fetchProduct } from '../../components/adminComponents/Product/ProductActions';

const ProductPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    setEditingBook(null); // No book being edited
    setShowForm(true);
  };

  const handleEdit = async (bookId: string) => {
    const book = await fetchProduct(bookId); // You'll need to implement this if not already done
    setEditingBook(book);
    setShowForm(true);
  };

const handleSave = async (data: BookFormData, imageFile: File | null) => {
  setIsSubmitting(true);
  try {
    // Convert form data to correct backend shape
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
        <ProductList onAdd={handleAdd} onEdit={handleEdit} />
      ) : (
        <BookForm
          book={editingBook ?? null}
          onClose={handleCloseForm}
          onSave={handleSave}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default ProductPage;
