import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/common/AuthLayout";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const data = await login(form);
      navigate(data.user?.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout
      title="Log in to your Tasqro workspace."
      description="Keep workspaces, team members, task priorities, and deadlines aligned in one focused command center."
    >
      <div className="w-full">
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-900">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-black outline-none transition focus:border-black focus:bg-white focus:ring-4 focus:ring-black/10"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-900">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-black outline-none transition focus:border-black focus:bg-white focus:ring-4 focus:ring-black/10"
              placeholder="Enter your password"
            />
          </div>

          <button className="h-11 w-full rounded-xl bg-black px-4 text-sm font-bold text-white transition hover:bg-zinc-800 disabled:opacity-60">
            Log in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-bold text-black underline-offset-4 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;
