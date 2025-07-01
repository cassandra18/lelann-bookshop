import { useEffect, useState } from "react";
import { Author, createAuthor, updateAuthor } from "../api/authorAPI";
import { toast } from "react-hot-toast";

interface AuthorFormProps {
  onAuthorAdded?: () => void;
  editingAuthor?: Author | null;
  onCancelEdit?: () => void;
}

export default function AuthorForm({
  onAuthorAdded,
  editingAuthor,
  onCancelEdit,
}: AuthorFormProps) {
  const [newAuthor, setNewAuthor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingAuthor) {
      setNewAuthor(editingAuthor.name);
    } else {
      setNewAuthor("");
    }
  }, [editingAuthor]);

  const handleSubmit = async () => {
    setError("");

    if (!newAuthor.trim()) {
      setError("Author name cannot be empty.");
      return;
    }

    try {
      if (editingAuthor) {
        await updateAuthor(editingAuthor.id, { name: newAuthor });
        toast.success(`Author "${newAuthor}" updated successfully.`);
        onCancelEdit?.();
      } else {
        const result = await createAuthor({ name: newAuthor });
        toast.success(`Author "${result.name}" created successfully.`);
      }

      setNewAuthor("");
      onAuthorAdded?.();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err.message || "An unexpected error occurred.";
      setError(msg);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full ">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">
        {editingAuthor ? "✏️ Edit Author" : "➕ Add New Author"}
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter author name"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          onClick={handleSubmit}
          className="bg-yellow-300 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-100"
        >
          {editingAuthor ? "Update" : "Add"}
        </button>
        {editingAuthor && (
          <button
            onClick={onCancelEdit}
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
