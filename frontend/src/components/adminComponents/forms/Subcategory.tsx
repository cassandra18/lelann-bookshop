import { useEffect, useState } from "react";
import {
  createEntity,
  updateEntity,
  fetchAll,
  BaseEntity,
} from "../api/entityAPI";
import { toast } from "react-hot-toast";

interface CategoryFormProps {
  onCategoryAdded?: () => void;
  editingSubcategory?: { id: string; name: string; category_id: string } | null;
  clearEditing?: () => void;
}

export default function SubcategoryForm({
  onCategoryAdded,
  editingSubcategory,
  clearEditing,
}: CategoryFormProps) {
  const [categories, setCategories] = useState<BaseEntity[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategories, setSubcategories] = useState<BaseEntity[]>([]);
  const [parentId, setParentId] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAll("categories")
      .then((data) => setCategories(data as BaseEntity[]))
      .catch(() => setError("Failed to load categories"));
  }, []);

  useEffect(() => {
    fetchAll("subcategories")
      .then((data) => setSubcategories(data as BaseEntity[]))
      .catch(() => console.error("Failed to load subcategories"));
  }, []);

  useEffect(() => {
    if (editingSubcategory) {
      setName(editingSubcategory.name);
      setCategoryId(editingSubcategory.category_id);
    } else {
      setName("");
      setCategoryId("");
    }
  }, [editingSubcategory]);

  const handleSubmit = async () => {
    setMessage("");
    setError("");
    setLoading(true);

    if (!name.trim() || !categoryId) {
      setError("Subcategory name and category must be selected.");
      setLoading(false);
      return;
    }

    try {
      let result;
      const payload: any = {
        name,
        categoryId,
      };

      if (parentId) {
        payload.parentId = parentId;
      }

      if (editingSubcategory) {
        result = await updateEntity(
          "subcategories",
          editingSubcategory.id,
          payload
        );
        toast.success(`Subcategory "${result.name}" updated successfully.`);
      } else {
        result = await createEntity("subcategories", payload);
        toast.success(`Subcategory "${result.name}" created successfully.`);
      }

      setName("");
      setCategoryId("");
      setParentId("");

      if (onCategoryAdded) onCategoryAdded();
      if (clearEditing) clearEditing();
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">
        {editingSubcategory ? "✏️ Edit Subcategory" : "➕ Add New Subcategory"}
      </h2>

      <input
        type="text"
        placeholder="Enter subcategory name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-900 text-white mb-2"
      />

      {/* Select category */}
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-900 text-white mb-4"
      >
        <option value="" className="bg-blue-400 text-black">
          Select category
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Select parent subcategory */}
      <select
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-900 text-white mb-4"
      >
        <option value="" className="bg-blue-400 text-black">(Optional) Select parent subcategory</option>
        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-yellow-300 text-black px-4 py-2 rounded font-semibold ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading
            ? editingSubcategory
              ? "Updating..."
              : "Adding..."
            : editingSubcategory
            ? "Update"
            : "Add"}
        </button>

        {editingSubcategory && (
          <button
            onClick={clearEditing}
            className="bg-gray-600 text-white px-4 py-2 rounded font-semibold"
          >
            Cancel
          </button>
        )}
      </div>

      {message && <p className="text-green-400 mt-2">{message}</p>}
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}
