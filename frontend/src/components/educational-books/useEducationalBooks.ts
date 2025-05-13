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

const EDUCATIONAL_CATEGORY_ID = "YOUR_EDUCATIONAL_CATEGORY_ID"; // Replace with real ID

const useEducationalBooks = (subcategoryId: string | undefined, sortOption: string) => {
  const [books, setBooks] = useState<EducationalBook[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`/api/products?category_id=${EDUCATIONAL_CATEGORY_ID}`);
      const fetchedBooks = response.data.filter((book: EducationalBook) => book.subcategory?.category_id === EDUCATIONAL_CATEGORY_ID);
      setBooks(fetchedBooks);
    } catch (err) {
      setError("Error fetching educational books");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`/api/subcategory?category_id=${EDUCATIONAL_CATEGORY_ID}`);
      setSubcategories(response.data);
    } catch (err) {
      setError("Error fetching subcategories");
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchSubcategories();
  }, []);

  // Filter and sort
  let filteredBooks = subcategoryId
    ? books.filter((book) => book.subcategory.id === subcategoryId)
    : books;

  if (sortOption === "price-asc") {
    filteredBooks = filteredBooks.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredBooks = filteredBooks.sort((a, b) => b.price - a.price);
  } else if (sortOption === "popularity") {
    filteredBooks = filteredBooks.sort((a, b) => b.popularity - a.popularity);
  }

  return {
    filteredBooks,
    subcategories,
    loading,
    error,
  };
};

export default useEducationalBooks;
