import { LayoutDashboard, Trash2 } from "lucide-react";

function AdminBoardsList({ boards, onDeleteBoard }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
      <div className="mb-5 flex items-center gap-2">
        <LayoutDashboard size={20} />
        <h2 className="text-xl font-black">Boards</h2>
      </div>

      <div className="space-y-3">
        {boards.map((board) => (
          <div
            key={board._id}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3"
          >
            <div>
              <p className="font-bold">{board.title}</p>
              <p className="mt-1 text-xs text-zinc-400">
                Owner: {board.createdBy?.name || "Unknown"}
              </p>
            </div>

            <button
              onClick={() => onDeleteBoard(board._id)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 text-red-300 hover:bg-red-500/10"
              title="Delete board"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {boards.length === 0 && (
          <p className="py-8 text-center text-sm text-zinc-500">
            No boards found.
          </p>
        )}
      </div>
    </section>
  );
}

export default AdminBoardsList;
