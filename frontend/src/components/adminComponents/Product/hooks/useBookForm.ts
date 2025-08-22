import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { BookFormData } from "../../../types/BookTypes";

export function useBookForm(initialData: Partial<BookFormData> = {}) {
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [publishers, setPublishers] = useState<any[]>([]);

  const [formData, setFormData] = useState<BookFormData>({
    name: "",
    price: 0.00,
    oldPrice: 0.00,
    subject: "",
    grade: "",
    format: "",
    isbn: "",
    language: "",
    yearPublished: "",
    stock: "",
    curriculum: "",
    level: "",
    company: "",
    condition: "NEW",
    category_id: "",
    subcategory_ids: [],
    author_id: "",
    publisher_id: "",
    description: "",
    featured: false,
    bestseller: false,
    newarrival: false,
    promotion: false,
    wishlist: false,
    ...initialData,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoryRes, subcategoryRes, authorRes, publisherRes] =
          await Promise.all([
            axiosInstance.get("/categories"),
            axiosInstance.get("/subcategories"),
            axiosInstance.get("/authors"),
            axiosInstance.get("/publishers"),
          ]);

        setCategories(categoryRes.data);
        setSubcategories(subcategoryRes.data);
        setAuthors(authorRes.data);
        setPublishers(publisherRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (formData.category_id) {
      const filtered = subcategories.filter(
        (sub) => String(sub.category_id) === String(formData.category_id)
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.category_id, subcategories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    // Handle multi-select dropdown
    if (name === "subcategory_ids" && (e.target as HTMLSelectElement).multiple) {
      const selectedValues = Array.from(
        (e.target as HTMLSelectElement).options
      )
        .filter(option => option.selected)
        .map(option => option.value);

      setFormData((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } 
    // Handle file input
    else if (type === "file" && files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } 
    // Handle checkbox
    else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
    // Handle number inputs (convert string value to number)
    else if (["price", "oldPrice", "pages", "yearPublished", "stock", "rating"].includes(name)) {
        setFormData((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    }
    // Handle other inputs
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return {
    formData,
    handleChange,
    categories,
    filteredSubcategories,
    authors,
    publishers,
    setFormData,
  };
}