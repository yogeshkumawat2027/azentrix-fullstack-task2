import { useEffect, useState } from "react";
import { LogOut, Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function ProfileMenu({ onClose }) {
  const { user, logout, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
      };

      if (form.password) {
        payload.password = form.password;
      }

      await updateProfile(payload);
      setForm((current) => ({ ...current, password: "" }));
      setMessage("Profile updated");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="absolute right-0 top-14 w-80 rounded-2xl border border-white/10 bg-zinc-950 p-5 pt-4 text-left shadow-xl shadow-black/30">
      <button
        onClick={onClose}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
        title="Close profile"
      >
        <X size={16} />
      </button>

      <p className="pr-8 text-xl font-black tracking-tight text-white">
        Profile
      </p>
      <p className="mt-1 text-xs font-bold uppercase text-zinc-500">
        {user?.role || "member"}
      </p>

      {message && (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-200">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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

        <button
          disabled={saving}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-700 disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>

      <button
        onClick={logout}
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-800"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default ProfileMenu;
