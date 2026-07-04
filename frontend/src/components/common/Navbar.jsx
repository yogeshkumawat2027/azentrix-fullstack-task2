import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

function Navbar() {
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img
            src="/trelloLogo.png"
            alt="Tasqro logo"
            className="h-10 w-10 object-contain"
          />

          <div>
            <h1 className="text-lg font-black leading-none tracking-tight text-white">
              Tasqro
            </h1>

          </div>
        </div>

        <div className="flex items-center gap-3">
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm font-bold text-white transition hover:bg-zinc-800"
            >
              <Shield size={16} />
              Admin
            </Link>
          )}

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white text-sm font-black text-black transition hover:bg-zinc-200"
              title="Open profile"
            >
              {initial}
            </button>

            {isProfileOpen && (
              <ProfileMenu onClose={() => setIsProfileOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
