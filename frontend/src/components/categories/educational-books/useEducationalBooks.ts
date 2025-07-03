import { useEffect, useState } from "react";
import axios from "axios";

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface Author {
  id: string;
  name: string;
}

export interface EducationalBook {
  id: string;
  name: string;
  image: string;
  author: Author | null;
  price: number;
  cta: string;
  subcategory: Subcategory;
  popularity: number;
}


const useEducationalBooks = (categoryId: string, subcategoryId: string | undefined, sortOption: string) => {
  const [books, setBooks] = useState<EducationalBook[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchBooksAndSubcategories = async () => {
    setLoading(true);
    try {
      const [booksRes, subcatsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/products?category_id=${categoryId}`),
        axios.get(`http://localhost:5000/api/subcategories?category_id=${categoryId}`),
      ]);

      const fetchedBooks = booksRes.data.filter(
        (book: EducationalBook) => book.subcategory?.category_id === categoryId
      );

      setBooks(fetchedBooks);
      setSubcategories(subcatsRes.data);
    } catch (err: any) {
      setError(`Error fetching books or subcategories: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  fetchBooksAndSubcategories();
}, [categoryId]);

  // Filter and sort
  let filteredBooks = subcategoryId
    ? books.filter((book) => book.subcategory.id === subcategoryId)
    : books;

  if (sortOption === "price-asc") {
    filteredBooks = [...filteredBooks].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredBooks = [...filteredBooks].sort((a, b) => b.price - a.price);
  } else if (sortOption === "popularity") {
    filteredBooks = [...filteredBooks].sort((a, b) => b.popularity - a.popularity);
  }

  return {
    filteredBooks,
    subcategories,
    loading,
    error,
  };
};

export default useEducationalBooks;
