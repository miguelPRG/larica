import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Home</h1>
      <p>Bem-vindo!</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
