import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './checkoutcard';

const BookDetails: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch book details
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${bookId}`);
                console.log("Fetched Book Details:", response.data);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setError("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    if (!book) return <p>Book not found</p>;

    return (
        
        <div className='flex flex-col lg:flex-row'>
        <div className="flex flex-col items-center lg:items-start lg:w-3/4 p-4 mb-36">
            <img src={book.image} alt={book.name} className="w-64 h-64 md:w-96 md:h-96 object-contain my-10" />
            <div className='lg:px-4'>
            <h1 className="text-3xl font-bold text-sunset">{book.name}</h1>
                <p className="text-lg text-gray-400 mt-4"><strong>Author: </strong>{book.author?.name || "Unknown"}</p>
                <p className="text-lg text-gray-400"><strong>Price:</strong> KES {book.price}</p>
            </div>
            <p className="text-lg text-gray300 mt-4 lg:px-4">{book.description}</p>
        </div>

        <ProductCard  price={book.price}/>
        </div>
    );
};


export default BookDetails;