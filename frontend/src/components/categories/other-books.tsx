import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../pagination";
import { useCart } from "../cart-functionality";

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
  popularity: number; // Assuming this property exists for sorting
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
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortOption, setSortOption] = useState<string>("relevance");
  const { dispatch } = useCart();

  const handleAddToCart = (book: OtherBook) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: book.id,
        name: book.name,
        price: book.price,
        quantity: 1,
        image: book.image,
      }
      });
    alert(`Added ${book.name} to basket`);
    };

  useEffect(() => {
    // Fetch other books
    const fetchOtherBooks = async () => {
      try {
        const response = await axios.get(
          `https://lelann-bookshop.onrender.com/api/products?category_id=${categoryId}`
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
          `https://lelann-bookshop.onrender.com/api/subcategory?category_id=${categoryId}`
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
    let filtered = subcategoryId
      ? otherBooks.filter((book) => book.subcategory.id === subcategoryId)
      : otherBooks;

    // Sort the books based on the selected sort option
    if (sortOption === "price-asc") {
      filtered = filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "price-desc") {
      filtered = filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortOption === "popularity") {
      filtered = filtered.sort((a, b) => b.popularity - a.popularity); // Descending popularity
    }

    console.log("Sorted books:", filtered);
    setFilteredBooks(filtered);
    setCurrentPage(1); 
  }, [subcategoryId, otherBooks, sortOption]);

  // Page calculation
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
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
      <div className="w-1/4 pl-4 border-r-[1px] border-sunset-transparent">
        <h2 className="text-3xl font-bold mt-14 mb-7 pb-4 text-sunset border-b border-sunset-transparent">
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

        {/* Sort and Items Per Page Controls */}
        <div className="flex justify-end gap-4 mb-4 rounded-md ">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-md bg-slate-200 text-prussian-blue p-1"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price (High to low)</option>
            <option value="price-desc">Price (Low to high)</option>
            <option value="popularity">Most Popular</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded-md bg-slate-200 text-prussian-blue p-1"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={60}>60 per page</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-4 pt-4">
          {displayedBooks.map((book) => (
            
            <div
              key={book.id}
              className="rounded-sm group hover:border-2 hover:border-sunset shadow-lg bg-white w-36 md:w-44 lg:w-44 overflow-hidden flex flex-col transform transition-transform duration-200 hover:scale-95"
            >
              <Link to={`/otherbooks/${book.id}`} key={book.id}>
              <div className="flex justify-center items-center p-2">
                <img src={book.image} alt={book.name} className="h-36 w-36 md:w-38 md:h-38 lg:h-38" />
              </div>
              <div className="p-2">
                <h2 className="text-lg text-prussian-blue font-semibold">
                  {book.name}
                </h2>
                <p className="text-gray-500">{book.author?.name || "Unknown Author"}</p>
                <h4 className="text-md text-prussian-blue lg:text-lg font-semibold">
                  KES {book.price}
                </h4>
              </div>
              </Link>
              <div className="mt-auto w-full">
                <button
                className="bg-gray-400 group-hover:bg-sunset group-hover:text-prussian-blue text-white lg:text-lg w-full p-2"
                onClick={() => handleAddToCart(book)}>
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
