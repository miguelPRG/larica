import { Suspense, useEffect, useState } from "react";
import { useAuth } from "./hooks/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import AppRoutes from "./routes/AppRoutes";
import { useShallow } from "zustand/react/shallow";

export default function App() {
  const [minLoadingTime, setMinLoadingTime] = useState(true);
  const { initialize, isLoading } = useAuth(
    useShallow((state) => ({
      initialize: state.initialize,
      isLoading: state.isLoading,
    })),
  );

  useEffect(() => {
    // Inicializa o listener de autenticação do Firebase
    const unsubscribe = initialize();

    // Timer de 2 segundos para a animação mínima
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 2000);

    //limpamos o eventlistner do firebase e o timer
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // Espera AMBOS: o tempo mínimo E a validação do Firebase
  if (minLoadingTime || isLoading) {
    return <LoadingAnimation />;
  }

  // Depois da verificação, está na hora da inicialização das rotas
  // As páginas serão carregadas de forma lazy com suspense dentro do componente AppRoutes
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen bg-dark-main">
            <div
              className="
              w-20 h-20 
              border-4 
              border-light-three 
              border-t-primary-main 
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
