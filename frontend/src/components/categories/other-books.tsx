import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
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
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categoryId = "3d6b891c-af05-44fa-8d39-a73cc9ce3164";
  const subCategoryId = "b5abc568-5b2d-44ef-b339-5685f0ca6b68"

  useEffect(() => {
    // Fetch other books
    const fetchOtherBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products?category_id=${categoryId}`
        );

        // Filter books based on subcategory.category_id
        const filteredBooks = response.data.filter((book: OtherBook) => {
        return book.subcategory && book.subcategory.category_id === categoryId; // Check if subcategory exists
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex max-w-7xl mx-auto mt-5">
      {/* Sidebar */}
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {subcategories.map((subcategory) => (
            <li key={subcategory.id}>
              {/* <Link
                to={subcategory.link}
                className="text-oxford-blue hover:text-sunset"
              >
                
              </Link> */}
              {subcategory.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Books Section */}
      <div className="w-3/4 p-4">
        <h1 className="text-4xl font-bold text-center mt-10 text-sunset">
          Other Books
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherBooks.map((book) => (
            <div
              key={book.id}
              className="border rounded-lg shadow-lg bg-white overflow-hidden"
            >
              <img
                src={book.image || 'placeholder-image-url.jpg'} // Use a placeholder if image is missing
                alt={book.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg text-selective-yellow font-semibold">
                  {book.name}
                </h2>
                <p className="text-gray-500">{book.author?.name || "Unknown Author"}</p>
                <h4 className="text-md text-prussian-blue lg:text-lg font-semibold mt-2">
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
      </div>
    </div>
  );
};

export default OtherBooks;
