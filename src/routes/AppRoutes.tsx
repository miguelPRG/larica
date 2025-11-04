import { lazy, type ReactElement } from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../hooks/AuthContext";
import { useShallow } from "zustand/react/shallow";

// Lazy loading das páginas
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));

/**
 * Rota privada: exige usuário autenticado
 */
function PrivateRoute({ children }: { children: ReactElement }) {
  
  const { user, isLoading } = useAuthStore(useShallow((state) => ({
    user: state.user,
    isLoading: state.isLoading,
  })));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-light-three animate-pulse">Carregando...</span>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}

/**
 * Rota pública: redireciona se o usuário já estiver autenticado
 */
function PublicRoute({ children }: { children: ReactElement }) {
   const { user, isLoading } = useAuthStore(useShallow((state) => ({
    user: state.user,
    isLoading: state.isLoading,
  })));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-light-three animate-pulse">Carregando...</span>
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;
  return children;
}

/**
 * Layout com animação entre páginas
 */
function AnimatedLayout() {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Outlet /> {/* Vai renderizar a rota pretenddida durante animação de transição*/}
    </motion.div>
  );
}

/**
 * Sistema de rotas principal com animações
 */
export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location}>
        <Route element={<AnimatedLayout />}>
          {/* Rota pública (login) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* Rota privada (home) */}
          <Route
            path="/"
            element={
              <HomePage/>
            }
          />
           {/* Qualquer rota desconhecida redireciona pra home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
