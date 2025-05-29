import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Loader2, Search, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BookForm from './bookForm';
import { Book } from '../types/BookTypes';

const BASE_URL = 'http://localhost:5000/api'; 

const BooksManagement = () => {
  const { isAuthenticated } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // For form submission state

  const fetchBooks = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddEditBook = async (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'image' | 'author' | 'publisher' | 'subcategory'>, imageFile: File | null) => {
    if (!isAuthenticated) return;
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Append all book data fields
    for (const key in bookData) {
      if (Object.prototype.hasOwnProperty.call(bookData, key)) {
        if (typeof (bookData as any)[key] === 'boolean') {
          formData.append(key, (bookData as any)[key] ? 'true' : 'false');
        } else {
          formData.append(key, String((bookData as any)[key]));
        }
      }
    }
    // Append image file if present
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (currentBook) {
        // Edit existing book
        await axios.put(`${BASE_URL}/product/update/${currentBook.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      } else {
        // Add new book
        await axios.post(`${BASE_URL}/product/add`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      }
      setIsModalOpen(false);
      setCurrentBook(null);
      fetchBooks();
    } catch (err: any) {
      console.error('Error saving book:', err);
      alert(`Failed to save book: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!isAuthenticated) return;
    if (window.confirm('Are you sure you want to delete this book?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`${BASE_URL}/product/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        fetchBooks(); // Re-fetch books to update the list
      } catch (err: any) {
        console.error('Error deleting book:', err);
        alert(`Failed to delete book: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Assuming 'name' for product title
    book.author?.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Assuming author object has a name
    book.publisher?.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Assuming publisher object has a name
    book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="ml-4 text-gray-600">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-600 bg-red-100 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Books Management</h2>
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
        <button
          onClick={() => { setCurrentBook(null); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition duration-300 ease-in-out"
        >
          <PlusCircle className="mr-2" size={20} /> Add New Book
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author?.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.publisher?.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${book.price?.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.condition}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.subcategory?.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => { setCurrentBook(book); setIsModalOpen(true); }}
                    className="text-blue-600 hover:text-blue-900 mr-3 p-1 rounded-full hover:bg-blue-100 transition duration-150 ease-in-out"
                    title="Edit Book"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition duration-150 ease-in-out"
                    title="Delete Book"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <BookForm
          book={currentBook}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddEditBook}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default BooksManagement;