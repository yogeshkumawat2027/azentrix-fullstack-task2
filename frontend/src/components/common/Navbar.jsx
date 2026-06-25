import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            T
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Mini Trello
            </h1>

            <p className="text-xs text-slate-500">
              Task Management
            </p>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="text-right">
            <h3 className="font-semibold text-slate-700">
              {user?.name}
            </h3>

            <p className="text-xs text-slate-500">
              {user?.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;