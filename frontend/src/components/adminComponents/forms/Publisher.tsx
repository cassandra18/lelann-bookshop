import { useEffect, useState } from "react";
import { createPublisher, updatePublisher, Publisher } from "../api/publisherAPI";
import { toast } from "react-hot-toast";

interface PublisherFormProps {
  onPublisherAdded?: () => void;
  editingPublisher?: Publisher | null;
  onCancelEdit?: () => void;
}

export default function PublisherForm({
  onPublisherAdded,
  editingPublisher,
  onCancelEdit,
}: PublisherFormProps) {
  const [newPublisher, setNewPublisher] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingPublisher) {
      setNewPublisher(editingPublisher.name);
    } else {
      setNewPublisher("");
    }
  }, [editingPublisher]);

  const handleSubmit = async () => {
    setError("");

    if (!newPublisher.trim()) {
      setError("Publisher name cannot be empty.");
      return;
    }

    try {
      if (editingPublisher) {
        await updatePublisher(editingPublisher.id, { name: newPublisher });
        toast.success(`Publisher "${newPublisher}" updated successfully.`);
        onCancelEdit?.();
      } else {
        const result = await createPublisher({ name: newPublisher });
        toast.success(`Publisher "${result.name}" created successfully.`);
      }

      setNewPublisher("");
      onPublisherAdded?.();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "An unexpected error occurred.";
      setError(msg);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">
        {editingPublisher ? "✏️ Edit Publisher" : "🏢 Add New Publisher"}
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter publisher name"
          value={newPublisher}
          onChange={(e) => setNewPublisher(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          onClick={handleSubmit}
          className="bg-yellow-300 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400"
        >
          {editingPublisher ? "Update" : "Add"}
        </button>
        {editingPublisher && (
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
