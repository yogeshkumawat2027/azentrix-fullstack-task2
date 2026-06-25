import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";

import BoardColumn from "../components/card/BoardColumn";
import BoardHeader from "../components/card/BoardHeader";
import CardModal from "../components/card/CardModal";
import Navbar from "../components/common/Navbaar";

const columns = ["To Do", "In Progress", "Done"];

function BoardDetails() {
  const { id } = useParams();

  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchBoardData = async () => {
    try {
      const boardRes = await api.get(`/boards/${id}`);
      const cardsRes = await api.get(`/boards/${id}/cards`);

      setBoard(boardRes.data.board);
      setCards(cardsRes.data.cards);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch board");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [id]);

  const handleCardCreated = (card) => {
    setCards((prev) => [card, ...prev]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />
        <p className="p-6 text-slate-500">Loading board...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <BoardHeader
          board={board}
          onOpenCreateCard={() => setIsCreateOpen(true)}
        />

        <CardModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          boardId={id}
          onCardCreated={handleCardCreated}
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {columns.map((column) => (
            <BoardColumn
              key={column}
              title={column}
              cards={cards.filter((card) => card.column === column)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default BoardDetails;