import { useEffect, useState } from "react";
import api from "../api/axios";

import BoardForm from "../components/board/BoardForm";
import BoardGrid from "../components/board/BoardGrid";
import Navbar from "../components/common/Navbaar";

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBoards = async () => {
    try {
      const res = await api.get("/boards");
      setBoards(res.data.boards);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch boards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleBoardCreated = (board) => {
    setBoards((prev) => [board, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">My Boards</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage your task boards.
          </p>
        </div>

        <BoardForm onBoardCreated={handleBoardCreated} />

        <BoardGrid boards={boards} loading={loading} />
      </main>
    </div>
  );
}

export default Dashboard;