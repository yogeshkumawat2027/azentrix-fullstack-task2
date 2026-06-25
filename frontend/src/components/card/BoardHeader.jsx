import { Link } from "react-router-dom";

function BoardHeader({ board, onOpenCreateCard }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Back to dashboard
        </Link>

        <h1 className="mt-2 text-3xl font-bold text-slate-800">
          {board?.title}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {board?.description || "No description"}
        </p>
      </div>

      <button
        onClick={onOpenCreateCard}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        + Add Card
      </button>
    </div>
  );
}

export default BoardHeader;