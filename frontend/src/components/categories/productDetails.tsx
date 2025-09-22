import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductPage from './productPage';


const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        // Fetch book details
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
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
    }, [id]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    if (!book) return <p>Book not found</p>;

    return (
        
        <div className='flex flex-col lg:flex-row'>
        <ProductPage  book={book}/>
        </div>
    );
};


export default BookDetails;