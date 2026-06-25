import BoardCard from "./BoardCard";

function BoardGrid({ boards, loading }) {
  if (loading) {
    return <p className="text-slate-500">Loading boards...</p>;
  }

  if (boards.length === 0){
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          No boards found
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Create your first board to start managing tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {boards.map((board) => (
        <BoardCard key={board._id} board={board} />
      ))}
    </div>
  );
}

export default BoardGrid;