import { useEffect, useState } from "react";
import { createEntity, updateEntity } from "../api/entityAPI";
import { toast } from "react-hot-toast";

interface CategoryFormProps {
  onCategorySaved?: () => void;
  editingCategory?: { id: string; name: string } | null;
  clearEditing?: () => void;
}

export default function CategoryForm({
  onCategorySaved,
  editingCategory,
  clearEditing,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCategory) setName(editingCategory.name);
    else setName("");
  }, [editingCategory]);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    if (!name.trim()) {
      setError("Category name cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      if (editingCategory) {
        const result = await updateEntity("categories", editingCategory.id, {
          name,
        });
        toast.success(`Category "${result.name}" updated.`);
      } else {
        const result = await createEntity("categories", { name });
        toast.success(`Category "${result.name}" created.`);
      }
      setName("");
      if (onCategorySaved) onCategorySaved();
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
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full ">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">
        {editingCategory ? "✏️ Edit Category" : "➕ Add New Category"}
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-900 text-white"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-yellow-300 text-black px-4 py-2 rounded font-semibold ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading
            ? editingCategory
              ? "Updating..."
              : "Adding..."
            : editingCategory
            ? "Update"
            : "Add"}
        </button>
        {editingCategory && (
          <button
            onClick={clearEditing}
            className="text-red-600 bg-white rounded px-2 py-2 font-semibold hover:bg-yellow-100"
          >
            Cancel
          </button>
        )}
      </div>
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}
