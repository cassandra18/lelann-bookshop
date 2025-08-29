// useCategoryData.ts

import { useState, useEffect } from 'react';
import { fetchCategoryIdByName } from '../api/bookService'; 

export const useCategoryData = (categoryName: string) => {
    const [category_id, setCategoryId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [productData, setProductData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedCategoryId = await fetchCategoryIdByName(categoryName);
                
                if (fetchedCategoryId) {
                    setCategoryId(fetchedCategoryId);
                } else {
                    setError('Category ID not found');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch category data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categoryName]);

    return {
        category_id,
        loading,
        error,
        totalPages,
        setTotalPages,
        productData,
        setProductData,
    };
};