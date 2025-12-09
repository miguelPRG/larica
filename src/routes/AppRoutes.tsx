import { lazy, type ReactElement, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { ToastContainer, Bounce } from "react-toastify";
import { SpinLoading } from "../components/SpinLoading";

// Lazy loading das páginas — carrega apenas quando necessário
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const EditProfilePage = lazy(() => import("../pages/EditProfilePage"));

// Interface para tipar a localização do usuário
interface UserLocation {
  lat: number; // latitude
  log: number; // longitude
}

/**
 * Rota privada: só permite acesso se o usuário estiver autenticado
 */
function PrivateRoute({ children }: { children: ReactElement }) {
  const email = useAuth((state) => state.user?.email);

  // Se não tiver email (não autenticado), redireciona para login
  if (!email) return <Navigate to="/login" replace />;
  return children;
}

/**
 * Rota pública: redireciona para home se o usuário já estiver autenticado
 */
function PublicRoute({ children }: { children: ReactElement }) {
  const email = useAuth((state) => state.user?.email);

  // Se já tiver email (autenticado), redireciona para "/"
  if (email) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  const location = useLocation(); // captura a rota atual
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null); // estado da localização
  const [loadingLocation, setLoadingLocation] = useState(true); // controla o carregamento da localização

  /**
   * useEffect para capturar a localização do usuário quando o componente monta
   */
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();

        const latitude = Number(data.latitude);
        const longitude = Number(data.longitude);

        if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
          setUserLocation({ lat: latitude, log: longitude });
        } else {
          console.warn("Coordenadas inválidas recebidas do ipapi");
          setUserLocation({ lat: 48.8566, log: 2.3522 });
        }
      } catch (error: any) {
        console.error("Erro ao obter localização via ipapi:", error?.message ?? error);
        setUserLocation({ lat: 48.8566, log: 2.3522 });
      } finally {
        setLoadingLocation(false);
      }
    };

    getUserLocation();
  }, []);

  // Mostra loading até obter a localização
  if (loadingLocation || !userLocation) {
    return <SpinLoading />;
  }

  return (
    <>
      {/* ToastContainer: container global para notificações */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {/* Configuração das rotas */}
      <Routes location={location}>
        {/* Página de Login - pública */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Página de Registro - pública */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Edit Profile - privada */}
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          }
        />

        {/* Home - privada ou pública, passa a localização como prop */}
        <Route
          path="/"
          element={<HomePage userLocation={userLocation} />}
        />

        {/* Redireciona qualquer rota desconhecida para Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
