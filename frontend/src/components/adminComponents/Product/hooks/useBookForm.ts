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
    price: "",
    oldPrice: "",
    cta: "",
    subject: "",
    company: "",
    condition: "NEW",
    categoryId: "",
    subcategoryId: "",
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
    if (formData.categoryId) {
      const filtered = subcategories.filter(
        (sub) => String(sub.category_id) === String(formData.categoryId)
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.categoryId, subcategories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
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
