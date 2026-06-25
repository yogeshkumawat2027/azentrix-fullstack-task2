function CardItem({ card }) {
  const priorityClasses = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-semibold text-slate-800">{card.title}</h3>

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            priorityClasses[card.priority]
          }`}
        >
          {card.priority}
        </span>
      </div>

      {card.description && (
        <p className="text-sm text-slate-500">{card.description}</p>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>
          {card.assignee?.name ? `@${card.assignee.name}` : "Unassigned"}
        </span>

        <span>
          {card.dueDate
            ? new Date(card.dueDate).toLocaleDateString()
            : "No due date"}
        </span>
      </div>
    </div>
  );
}

export default CardItem;