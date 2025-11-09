import { Suspense, useEffect, useState } from "react";
import { useAuthStore } from "./hooks/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import AppRoutes from "./routes/AppRoutes";
import { useShallow } from "zustand/react/shallow";

export default function App() {
  // Garante que a animação de carregamento apareça por pelo menos 2 segundos
  const [minLoadingTime, setMinLoadingTime] = useState(true);
  const { initialize } = useAuthStore(
    useShallow((state) => ({
      initialize: state.initialize,
    })),
  );

  useEffect(() => {
    const unsubscribe = initialize();
    
    // Timer de 2 segundos para a animação mínima
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 2000);
    
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  //Enquanto o sistema verificar se o user está autenticado ou o tempo mínimo não passou, mostramos a animação de carregamento
  if (minLoadingTime) {
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
              w-20 h-20 
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
