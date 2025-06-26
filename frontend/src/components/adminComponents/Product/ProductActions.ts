// src/admin/products/ProductActions.ts

import { Book } from "../../types/BookTypes";

const BASE_URL = "http://localhost:5000/api";

export const fetchProducts = async (): Promise<Book[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchProduct = async (id: string): Promise<Book> => {
  const res = await fetch(`${BASE_URL}/product/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export const createProduct = async (
  product: Partial<Book>,
  imageFile: File | null
) => {
  const formData = new FormData();
  formData.append("product", JSON.stringify(product));

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const res = await fetch(`${BASE_URL}/product/add`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create product");
};


export const updateProduct = async (id: string, product: Partial<Book>, imageFile: File | null) => {
  const formData = new FormData();
  formData.append("product", JSON.stringify(product));
  if (imageFile) {
    formData.append("image", imageFile);
  }

  const res = await fetch(`${BASE_URL}/product/update/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to update product");
};


export const deleteProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/product/delete/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
};
