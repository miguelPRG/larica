import { Suspense, useEffect } from "react";
import { useAuthStore } from "./hooks/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import AppRoutes from "./routes/AppRoutes";
import { useShallow } from "zustand/react/shallow";

export default function App() {
  const { isLoading, initialize } = useAuthStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      initialize: state.initialize,
    }))
  );

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, []);

  //Enquanto o sistema verificar se o user está autenticado, mostramos a animação de carregamento
  if (isLoading) {
    return <LoadingAnimation />;
  }

  // Depois da verificação, está na hora da inicialização das rotas
  // As páginas serão carregadas de forma lazy com suspense dentro do AppRoutes
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen bg-dark-main">
            <div
              className="
              w-30 h-30 
              border-4 
              border-light-three 
              border-t-secondary-main 
              rounded-full 
              animate-spin
            "
            ></div>
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    </Router>
  );
}
