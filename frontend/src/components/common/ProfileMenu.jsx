import { useEffect, useState } from "react";
import { Edit, LogOut, Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function ProfileMenu({ onClose }) {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
  }, [user]);

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = () => {
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setError("");
    setIsEditing(false);
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email) {
      setError("Name and email are required");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: form.name,
        email: form.email,
      };

      if (form.password) {
        payload.password = form.password;
      }

      await updateProfile(payload);
      setIsEditing(false);
      setForm((current) => ({ ...current, password: "" }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="absolute right-0 top-14 w-80 rounded-2xl border border-white/10 bg-zinc-950 p-5 pt-4 text-center shadow-xl shadow-black/30">
      <button
        onClick={onClose}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
        title="Close profile"
      >
        <X size={16} />
      </button>

      {!isEditing ? (
        <>
          <p className="pr-8 text-xl font-black tracking-tight text-white">
            {user?.name || "User"}
          </p>

          <p className="mt-2 break-words text-sm font-medium text-zinc-400">
            {user?.email || "No email"}
          </p>

          <button
            onClick={handleEdit}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            <Edit size={18} />
            Edit Profile
          </button>

          <button
            onClick={logout}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="pt-7 text-left">
          <p className="mb-4 text-center text-xl font-black tracking-tight text-white">
            Edit Profile
          </p>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-200">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm text-white outline-none transition focus:border-white/30"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-200">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm text-white outline-none transition focus:border-white/30"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-200">
                New Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm text-white outline-none transition focus:border-white/30"
                placeholder="Leave blank to keep current"
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              disabled={saving}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-700 disabled:opacity-60"
            >
              <Save size={18} />
              {saving ? "Saving" : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProfileMenu;
