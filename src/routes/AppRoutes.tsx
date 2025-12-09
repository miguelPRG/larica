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
      // Verifica se a API de geolocalização está disponível
      if (!navigator.geolocation) {
        console.error("Geolocalização não é suportada pelo navegador");
        setUserLocation({ lat: 48.8566, log: 2.3522 });
        setLoadingLocation(false);
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
              enableHighAccuracy: true,
              timeout: 10000, // timeout de 10 segundos
              maximumAge: 0 // não usa cache
            }
          );
        });

        const { latitude, longitude } = position.coords;
        console.log("Localização obtida:", latitude, longitude);
        setUserLocation({ lat: latitude, log: longitude });
      } catch (error: any) {
        console.error("Erro ao obter localização:", error.message);
        
        // Mensagens de erro mais específicas
        if (error.code === 1) {
          console.warn("Permissão negada pelo usuário");
        } else if (error.code === 2) {
          console.warn("Posição indisponível");
        } else if (error.code === 3) {
          console.warn("Timeout ao obter localização");
        }
        
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
