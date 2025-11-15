import { lazy, type ReactElement } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/AuthContext";
import { useShallow } from "zustand/react/shallow";

// Lazy loading das páginas
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));

/**
 * Rota privada: exige usuário autenticado
 */
function PrivateRoute({ children }: { children: ReactElement }) {
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    })),
  );

  if (!user) return <Navigate to="/login" replace />;
  return children;
}

/**
 * Rota pública: redireciona se o usuário já estiver autenticado
 */
function PublicRoute({ children }: { children: ReactElement }) {
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    })),
  );

  if (user) return <Navigate to="/" replace />;
  return children;
}
export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      {/* Rota privada (home) */}
      <Route path="/" element={<HomePage />} />
      {/* Qualquer rota desconhecida redireciona pra home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
