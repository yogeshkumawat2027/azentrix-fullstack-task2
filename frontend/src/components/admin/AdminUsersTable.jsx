import { Trash2, Users } from "lucide-react";

function AdminUsersTable({ users, onRoleChange, onDeleteUser }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
      <div className="mb-5 flex items-center gap-2">
        <Users size={20} />
        <h2 className="text-xl font-black">Users</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-zinc-400">
            <tr className="border-b border-white/10">
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Role</th>
              <th className="py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-white/5">
                <td className="py-3 font-bold">{user.name}</td>
                <td className="py-3 text-zinc-400">{user.email}</td>
                <td className="py-3">
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user._id, e.target.value)}
                    className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white outline-none"
                  >
                    <option value="member">member</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => onDeleteUser(user._id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 text-red-300 hover:bg-red-500/10"
                    title="Delete user"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="py-8 text-center text-sm text-zinc-500">
            No users found.
          </p>
        )}
      </div>
    </section>
  );
}

export default AdminUsersTable;
