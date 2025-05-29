import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BookFormProps, BookFormData, Author, Publisher, Subcategory } from '../types/BookTypes';

const BASE_URL = 'http://localhost:5000/api';

const BookForm: React.FC<BookFormProps> = ({ book, onClose, onSave, isSubmitting }) => {
const [formData, setFormData] = useState<BookFormData>({
  name: book?.name || '',
  price: book?.price?.toString() || '',
  cta: book?.cta || '',
  oldPrice: book?.oldPrice?.toString() || '',
  discount: book?.discount?.toString() || '',
  condition: book?.condition || 'NEW',
  subject: book?.subject || '',
  author_id: book?.author_id || '',
  publisher_id: book?.publisher_id || '',
  subcategory_id: book?.subcategory_id || '',
  description: book?.description || '',
  company: book?.company || '',
  featured: book?.featured || false,
  bestseller: book?.bestseller || false,
  newarrival: book?.newarrival || false,
  wishlist: book?.wishlist || false,
  promotion: book?.promotion || false,
});

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loadingDependencies, setLoadingDependencies] = useState(true);
  const [dependencyError, setDependencyError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchDependencies = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingDependencies(true);
    setDependencyError(null);
    const token = localStorage.getItem('token');
    try {
      const [authorsRes, publishersRes, subcategoriesRes] = await Promise.all([
        axios.get(`${BASE_URL}/author`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }),
        axios.get(`${BASE_URL}/publisher`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }),
        axios.get(`${BASE_URL}/subcategory`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }),
      ]);
      setAuthors(authorsRes.data);
      setPublishers(publishersRes.data);
      setSubcategories(subcategoriesRes.data);
    } catch (err) {
      console.error('Error fetching dependencies:', err);
      setDependencyError('Failed to load authors, publishers, or categories.');
    } finally {
      setLoadingDependencies(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchDependencies();
  }, [fetchDependencies]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
   setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
      discount: formData.discount ? parseFloat(formData.discount) : undefined,
    };
    onSave(dataToSave, imageFile);
  };

  if (loadingDependencies) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-500" size={48} />
          <p className="ml-4 text-gray-600 mt-4">Loading form data...</p>
        </div>
      </div>
    );
  }

  if (dependencyError) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center text-red-600">
          <p>{dependencyError}</p>
          <button onClick={onClose} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{book ? 'Edit Book' : 'Add New Book'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" step="0.01" required />
            </div>
            <div>
              <label htmlFor="author_id" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
              <select id="author_id" name="author_id" value={formData.author_id} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select Author</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="publisher_id" className="block text-gray-700 text-sm font-bold mb-2">Publisher</label>
              <select id="publisher_id" name="publisher_id" value={formData.publisher_id} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select Publisher</option>
                {publishers.map(publisher => (
                  <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="subcategory_id" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <select id="subcategory_id" name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select Category</option>
                {subcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="condition" className="block text-gray-700 text-sm font-bold mb-2">Condition</label>
              <select id="condition" name="condition" value={formData.condition} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" required>
                <option value="NEW">NEW</option>
                <option value="USED">USED</option>
                <option value="USED_GOOD">USED_GOOD</option>
                <option value="USED_VERY_GOOD">USED_VERY_GOOD</option>
                <option value="USED_ACCEPTABLE">USED_ACCEPTABLE</option>
              </select>
            </div>
            <div>
              <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">Company</label>
              <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="cta" className="block text-gray-700 text-sm font-bold mb-2">CTA</label>
              <input type="text" id="cta" name="cta" value={formData.cta} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="oldPrice" className="block text-gray-700 text-sm font-bold mb-2">Old Price (Optional)</label>
              <input type="number" id="oldPrice" name="oldPrice" value={formData.oldPrice} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" step="0.01" />
            </div>
            <div>
              <label htmlFor="discount" className="block text-gray-700 text-sm font-bold mb-2">Discount (Optional)</label>
              <input type="number" id="discount" name="discount" value={formData.discount} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" step="0.01" />
            </div>
            <div>
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
              <input type="file" id="image" name="image" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              {book?.image && <p className="text-xs text-gray-500 mt-1">Current image: {book.image.split('/').pop()}</p>}
            
                {imageFile && (
                    <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="mt-2 h-20 object-contain border rounded"
                    />
                )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" required></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">Featured</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="bestseller" name="bestseller" checked={formData.bestseller} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="bestseller" className="ml-2 text-sm font-medium text-gray-700">Bestseller</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="newarrival" name="newarrival" checked={formData.newarrival} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="newarrival" className="ml-2 text-sm font-medium text-gray-700">New Arrival</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="wishlist" name="wishlist" checked={formData.wishlist} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="wishlist" className="ml-2 text-sm font-medium text-gray-700">Wishlist</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="promotion" name="promotion" checked={formData.promotion} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="promotion" className="ml-2 text-sm font-medium text-gray-700">Promotion</label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin mr-2" size={20} />}
              {book ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default BookForm;