import axios from "axios";
import { Book } from "../../types/BookTypes";

const BASE_URL = "http://localhost:5000/api";

// Get token helper
const getToken = () => localStorage.getItem("token");

// ✅ Fetch all products
export const fetchProducts = async (): Promise<Book[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// ✅ Fetch single product by ID
export const fetchProduct = async (id: string): Promise<Book> => {
  const res = await fetch(`${BASE_URL}/product/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

// ✅ Create new product
export const createProduct = async (bookData: Partial<Book>, imageFile: File | null) => {
  const token = getToken();
  const formData = new FormData();

  Object.entries(bookData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });

  if (imageFile) formData.append("image", imageFile);

  const res = await axios.post(`${BASE_URL}/product/add`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return res.data;
};

// ✅ Update existing product
export const updateProduct = async (id: string, bookData: Partial<Book>, imageFile: File | null) => {
  const token = getToken();
  const formData = new FormData();

  Object.entries(bookData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });

  if (imageFile) formData.append("image", imageFile);

  const res = await axios.put(`${BASE_URL}/product/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return res.data;
};

// ✅ Delete product by ID
export const deleteProduct = async (id: string) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/product/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete product");
};
