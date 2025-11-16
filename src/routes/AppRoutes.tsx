import { lazy, type ReactElement } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { ToastContainer, Bounce } from "react-toastify";

// Lazy loading das páginas
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));

/**
 * Rota privada: exige usuário autenticado
 */
function PrivateRoute({ children }: { children: ReactElement }) {
  
  const email = useAuth((state) => state.user?.email);
  
  if (!email) return <Navigate to="/login" replace />;
  return children;
}

/**
 * Rota pública: redireciona se o usuário já estiver autenticado
 */
function PublicRoute({ children }: { children: ReactElement }) {
  const email = useAuth((state) => state.user?.email);

  if (email) return <Navigate to="/" replace />;
  return children;
}
export default function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {/* Tudo o que for notificações da aplicação, serão geradas aqui. */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes location={location}>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="/" element={<HomePage />} />
        {/* Qualquer rota desconhecida redireciona pra home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
