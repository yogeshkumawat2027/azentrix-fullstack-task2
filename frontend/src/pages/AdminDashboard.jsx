import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/common/Navbar";
import Loader from "../components/common/Loader";
import AdminBoardsList from "../components/admin/AdminBoardsList";
import AdminErrorAlert from "../components/admin/AdminErrorAlert";
import AdminHeader from "../components/admin/AdminHeader";
import AdminUsersTable from "../components/admin/AdminUsersTable";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    try {
      setError("");
      const [usersRes, boardsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/boards"),
      ]);

      setUsers(usersRes.data.users || []);
      setBoards(boardsRes.data.boards || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const updateRole = async (userId, role) => {
    try {
      const res = await api.patch(`/admin/users/${userId}/role`, { role });

      setUsers((current) =>
        current.map((user) =>
          user._id === userId ? { ...user, role: res.data.user.role } : user
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update role");
    }
  };

  const deleteUser = async (userId) => {
    const confirmed = window.confirm("Delete this user and their boards?");
    if (!confirmed) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers((current) => current.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  const deleteBoard = async (boardId) => {
    const confirmed = window.confirm("Delete this board?");
    if (!confirmed) return;

    try {
      await api.delete(`/admin/boards/${boardId}`);
      setBoards((current) => current.filter((board) => board._id !== boardId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete board");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <AdminHeader usersCount={users.length} boardsCount={boards.length} />
        <AdminErrorAlert message={error} />

        {loading ? (
          <div className="flex min-h-72 items-center justify-center">
            <Loader text="Loading admin data..." />
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            <AdminUsersTable
              users={users}
              onRoleChange={updateRole}
              onDeleteUser={deleteUser}
            />
            <AdminBoardsList boards={boards} onDeleteBoard={deleteBoard} />
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
