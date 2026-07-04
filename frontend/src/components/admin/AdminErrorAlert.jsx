function AdminErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="mb-6 rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
      {message}
    </div>
  );
}

export default AdminErrorAlert;
