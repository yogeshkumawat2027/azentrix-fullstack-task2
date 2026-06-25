import { useDroppable } from "@dnd-kit/core";
import CardItem from "./CardItem";

function BoardColumn({ title, cards }) {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[400px] rounded-2xl p-4 transition ${
        isOver ? "bg-blue-100" : "bg-slate-200/70"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">{title}</h2>

        <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-600">
          {cards.length}
        </span>
      </div>

      <div className="space-y-3">
        {cards.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-400">
            Drop cards here
          </p>
        ) : (
          cards.map((card) => <CardItem key={card._id} card={card} />)
        )}
      </div>
    </div>
  );
}

export default BoardColumn;