import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  id: string;
  name: string;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

export const useSubcategories = (categoryName: string) => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [category_id, setCategory_id] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch categories and find the one matching the name
        const categoryRes = await axios.get<Category[]>('http://localhost:5000/api/categories');
        const matchedCategory = categoryRes.data.find(
          (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
        );

        if (!matchedCategory) {
          setError(`Category "${categoryName}" not found.`);
          return;
        }

        setCategory_id(matchedCategory.id);

        // 2. Fetch all subcategories
        const subcategoryRes = await axios.get<Subcategory[]>('http://localhost:5000/api/subcategories');
        const filtered = subcategoryRes.data.filter(
          (sub) => sub.category_id === matchedCategory.id
        );

        setSubcategories(filtered);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch category or subcategories.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  return { subcategories, category_id, loading, error };
};
