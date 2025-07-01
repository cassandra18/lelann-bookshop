import { useState } from "react";

const ManageAuthors = () => {
  const [authors, setAuthors] = useState([
    { id: 1, name: "Jane Doe" },
    { id: 2, name: "John Smith" },
  ]);
  const [newAuthor, setNewAuthor] = useState("");

  const handleAddAuthor = () => {
    if (!newAuthor.trim()) return;
    setAuthors([
      ...authors,
      { id: Date.now(), name: newAuthor.trim() }
    ]);
    setNewAuthor("");
  };

  const handleDeleteAuthor = (id: number) => {
    setAuthors(authors.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Form to Add Author */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">➕ Add New Author</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter author name"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            onClick={handleAddAuthor}
            className="bg-yellow-300 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400"
          >
            Add
          </button>
        </div>
      </div>

      {/* List of Authors */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">📋 Author List</h2>
        {authors.length === 0 ? (
          <p className="text-white">No authors added yet.</p>
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
              {authors.map((author, index) => (
                <tr key={author.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{author.name}</td>
                  <td className="p-2 space-x-2">
                    <button className="text-yellow-300 hover:text-yellow-400">✏️</button>
                    <button
                      onClick={() => handleDeleteAuthor(author.id)}
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
};

export default ManageAuthors;
