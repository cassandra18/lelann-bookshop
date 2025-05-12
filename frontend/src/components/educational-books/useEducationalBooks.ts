import { useState, useEffect } from "react";
import { Book, BookFilters, PaginatedBooksResponse } from "../types/BookTypes"
import axios from "axios";

const useEducationalBooks = (filters: BookFilters, page: number) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<PaginatedBooksResponse>("/api/books", {
        params: {
          ...filters,
          page,
          limit: 40, // Assuming 40 books per page
        },
      });
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
      setTotalBooks(response.data.total);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filters, page]);

  return { books, loading, totalPages, totalBooks };
};

export default useEducationalBooks;
