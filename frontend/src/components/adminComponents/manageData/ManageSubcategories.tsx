import { useEffect, useState } from "react";
import { fetchAll, deleteEntity, BaseEntity } from "../api/entityAPI";
import SubcategoryForm from "../forms/Subcategory";

interface SubcategoryEntity extends BaseEntity {
  category_id: string;
}

export default function ManageSubcategories() {
  const [subcategories, setSubcategories] = useState<SubcategoryEntity[]>([]);
  const [editingSubcategory, setEditingSubcategory] = useState<SubcategoryEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadSubcategories = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAll<SubcategoryEntity>("subcategories");
      setSubcategories(data);
    } catch (err: any) {
      setError(err.message || "Failed to load subcategories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEntity("subcategories", id);
      setSubcategories((prev) => prev.filter((sub) => sub.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete subcategory.");
    }
  };

  const clearEditing = () => setEditingSubcategory(null);

  useEffect(() => {
    loadSubcategories();
  }, []);

  return (
    <div className="space-y-6">
      <SubcategoryForm
        onCategoryAdded={loadSubcategories}
        editingSubcategory={editingSubcategory}
        clearEditing={clearEditing}
      />

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">
          📋 Subcategory List
        </h2>
        {loading ? (
          <p className="text-white">Loading subcategories...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : subcategories.length === 0 ? (
          <p className="text-white">No subcategories added yet.</p>
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
              {subcategories.map((sub, index) => (
                <tr
                  key={sub.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{sub.name}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => setEditingSubcategory(sub)}
                      className="text-yellow-300 hover:text-yellow-400"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(sub.id)}
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
