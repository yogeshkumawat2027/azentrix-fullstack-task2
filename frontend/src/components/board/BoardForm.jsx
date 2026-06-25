import { useState } from "react";
import api from "../../api/axios";

function BoardForm({ onBoardCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreateBoard = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setCreating(true);

      const res = await api.post("/boards", {
        title,
        description,
      });

      onBoardCreated(res.data.board);
      setTitle("");
      setDescription("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create board");
    } finally {
      setCreating(false);
    }
  };

  return (
    <form
      onSubmit={handleCreateBoard}
      className="mb-8 rounded-2xl bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Create New Board
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Board title"
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        />

        <button
          disabled={creating}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {creating ? "Creating..." : "Create Board"}
        </button>
      </div>
    </form>
  );
}

export default BoardForm;