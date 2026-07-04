import { Shield } from "lucide-react";

function AdminHeader({ usersCount, boardsCount }) {
  return (
    <div className="mb-8 rounded-[28px] border border-white/10 bg-zinc-950 px-6 py-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Shield size={30} />
          <div>
            <h1 className="text-4xl font-black tracking-tight">Admin Panel</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Manage users, roles, and workspaces.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-3">
            <p className="text-2xl font-black">{usersCount}</p>
            <p className="text-xs font-bold uppercase text-zinc-500">Users</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-3">
            <p className="text-2xl font-black">{boardsCount}</p>
            <p className="text-xs font-bold uppercase text-zinc-500">Boards</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
