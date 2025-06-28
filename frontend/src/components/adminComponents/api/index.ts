const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ------------------ Categories ------------------

export const fetchCategories = () =>
  fetch(`${API_URL}/categories`).then((res) => res.json());

export const getCategoryById = (id: string) =>
  fetch(`${API_URL}/categories/${id}`).then((res) => res.json());

export const createCategory = (data: { name: string }) =>
  fetch(`${API_URL}/categories/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const updateCategory = (id: string, data: { name: string }) =>
  fetch(`${API_URL}/categories/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deleteCategory = (id: string) =>
  fetch(`${API_URL}/categories/delete/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());


// ------------------ Subcategories ------------------

export const fetchSubcategories = () =>
  fetch(`${API_URL}/subcategories`).then((res) => res.json());

export const getSubcategoryById = (id: string) =>
  fetch(`${API_URL}/subcategories/${id}`).then((res) => res.json());

export const createSubcategory = (data: {
  name: string;
  categoryId: string;
  parentId?: string | null;
}) =>
  fetch(`${API_URL}/subcategories/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const updateSubcategory = (id: string, data: any) =>
  fetch(`${API_URL}/subcategories/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deleteSubcategory = (id: string) =>
  fetch(`${API_URL}/subcategories/delete/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());


// ------------------ Authors ------------------

export const fetchAuthors = () =>
  fetch(`${API_URL}/authors`).then((res) => res.json());

export const getAuthorById = (id: string) =>
  fetch(`${API_URL}/authors/${id}`).then((res) => res.json());

export const createAuthor = (data: { name: string }) =>
  fetch(`${API_URL}/authors/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const updateAuthor = (id: string, data: { name: string }) =>
  fetch(`${API_URL}/authors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deleteAuthor = (id: string) =>
  fetch(`${API_URL}/authors/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());


// ------------------ Publishers ------------------

export const fetchPublishers = () =>
  fetch(`${API_URL}/publishers`).then((res) => res.json());

export const getPublisherById = (id: string) =>
  fetch(`${API_URL}/publishers/${id}`).then((res) => res.json());

export const createPublisher = (data: { name: string }) =>
  fetch(`${API_URL}/publishers/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const updatePublisher = (id: string, data: { name: string }) =>
  fetch(`${API_URL}/publishers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deletePublisher = (id: string) =>
  fetch(`${API_URL}/publishers/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
