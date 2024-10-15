import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../pagination";

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface Author {
  id: string;
  name: string;
}

interface OtherBook {
  id: string;
  name: string;
  image: string;
  author: Author | null;
  price: number;
  cta: string;
  subcategory: Subcategory;
}

const OtherBooks: React.FC = () => {
  const [otherBooks, setOtherBooks] = useState<OtherBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<OtherBook[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubacategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { subcategoryId } = useParams<{ subcategoryId: string }>();

  const categoryId = "3d6b891c-af05-44fa-8d39-a73cc9ce3164"; // Other Books Category ID
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetch other books
    const fetchOtherBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products?category_id=${categoryId}`
        );

        // Filter books based on subcategory.category_id
        const filteredBooks = response.data.filter((book: OtherBook) => {
          return book.subcategory && book.subcategory.category_id === categoryId;
        });
        
        console.log("Fetched Other Books:", filteredBooks);
        setOtherBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching other books:", error);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch subcategories for the 'Other Books' category
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/subcategory?category_id=${categoryId}`
        );
        console.log("Fetched Subcategories:", response.data);
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setError("An error occurred while fetching subcategories.");
      }
    };

    fetchOtherBooks();
    fetchSubcategories();
  }, [categoryId]);

  useEffect(() => {
    // Extract subcategory IDs from the fetched otherbooks
    const subcategoryIds = new Set(otherBooks.map((book) => book.subcategory.id));

    // Filter subcategories that are present in the otherBooks
    const relevantSubcategories = subcategories.filter((subcategory) => subcategoryIds.has(subcategory.id));
    setFilteredSubcategories(relevantSubcategories);
  }, [otherBooks, subcategories]);

  useEffect(() => {
    // Filter books based on the selected subcategory
    const filtered = subcategoryId
      ? otherBooks.filter((book) => book.subcategory.id === subcategoryId)
      : otherBooks;
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to the first page when subcategory changes
  }, [subcategoryId, otherBooks]);



  // Page calculation
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  console.log("Total Pages:", totalPages);
  console.log("Filtered Books Length:", filteredBooks.length);
  console.log("Items Per Page:", itemsPerPage);
  
  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const selectedSubcategoryName = filteredSubacategories.find(
    (subcategory) => subcategory.id === subcategoryId
  )?.name;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex max-w-7xl mx-auto">
      {/* Sidebar */}
      <div className="w-1/4 pl-4 border-r-[1px] border-sunset">
        <h2 className="text-3xl font-bold mt-14 mb-7 pb-4 text-sunset border-b border-sunset">
          Categories
        </h2>
        <ul className="space-y-2">
          <li>
            <Link to="/other-books" className={`${!subcategoryId ? "text-selective-yellow" : ""}`}>
              All Books
            </Link>
          </li>
          {filteredSubacategories.map((subcategory) => (
            <li key={subcategory.id}>
              <Link
                to={`/other-books/${subcategory.id}`}
                className={`${
                  subcategoryId === subcategory.id ? "text-selective-yellow" : ""
                }`}>
                {subcategory.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Books Section */}
      <div className="w-3/4 mb-32">
        <h1 className="text-4xl font-bold text-center my-10 text-sunset">
          {subcategoryId ? `${selectedSubcategoryName} Books` : "All Books"}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-4 pt-4">
          {displayedBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-sm shadow-lg bg-white w-36 md:w-44 lg:w-44 overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-95 hover:border-2 hover:border-sunset"
            >
              <div className="flex justify-center items-center p-2">
                <img src={book.image} alt={book.name} className="h-36 w-36 md:w-38 md:h-38 lg:h-38" />
              </div>
              <div className="p-2">
                <h2 className="text-lg text-selective-yellow font-semibold">
                  {book.name}
                </h2>
                <p className="text-gray-500">{book.author?.name || "Unknown Author"}</p>
                <h4 className="text-md text-prussian-blue lg:text-lg font-semibold">
                  KES {book.price}
                </h4>
              </div>
              <div className="mt-auto w-full">
                <button className="bg-gray-400 text-white lg:text-lg w-full p-2">
                  {book.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page)
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OtherBooks;
