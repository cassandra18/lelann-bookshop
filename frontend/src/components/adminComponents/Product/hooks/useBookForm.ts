import { useEffect, useState } from "react";
import axios from "axios";
import { BookFormData } from "../../../types/BookTypes";

export function useBookForm(initialData: Partial<BookFormData> = {}) {
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);

  const [formData, setFormData] = useState<BookFormData>({
    name: "",
    price: "",
    condition: "NEW",
    description: "",
    company: "",
    featured: false,
    bestseller: false,
    newarrival: false,
    promotion: false,
    wishlist: false,
    categoryId: "", // include this for controlled select
    subcategory_id: "",
    ...initialData,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoryRes, subcategoryRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/subcategories"),
        ]);
        setCategories(categoryRes.data);
        setSubcategories(subcategoryRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      const filtered = subcategories.filter(
        (sub) => sub.categoryId === formData.categoryId
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.categoryId, subcategories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
if (
    e.target instanceof HTMLInputElement &&
    e.target.type === "file" &&
    e.target.files
  ) {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [name]: file,
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
    setFormData,
  };
}
