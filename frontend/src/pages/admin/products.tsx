// src/pages/admin/products.tsx
import { useState } from 'react';
import ProductList from '../../components/adminComponents/Product/ProductList';
import ProductForm from '../../components/adminComponents/Product/ProductForm';
import { Book } from '../../components/types/BookTypes';

const ProductPage = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedBook(null);
  };

  return (
    <div className="space-y-4">
      <ProductList onAdd={handleAdd} />
      {showForm && (
       
      )}
    </div>
  );
};

export default ProductPage;
