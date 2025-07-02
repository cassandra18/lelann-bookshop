import { useEffect, useState } from "react";
import { fetchAll, deleteEntity, BaseEntity } from "../api/entityAPI";
import CategoryForm from "../forms/Category";

export default function ManageCategories() {
  const [categories, setCategories] = useState<BaseEntity[]>([]);
  const [editingCategory, setEditingCategory] = useState<BaseEntity | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAll<BaseEntity>("categories");
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await deleteEntity("categories", id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete category.");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="space-y-6">
      <CategoryForm
        onCategorySaved={loadCategories}
        editingCategory={editingCategory}
        clearEditing={() => setEditingCategory(null)}
      />
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">
          📋 Category List
        </h2>
        {loading ? (
          <p className="text-white">Loading categories...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-white">No categories added yet.</p>
        ) : (
          <table className="w-full text-left table-auto text-white">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{cat.name}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => setEditingCategory(cat)}
                      className="text-yellow-300 hover:text-yellow-400 pr-4"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
