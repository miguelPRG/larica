import { Suspense, useEffect, useState, useMemo } from "react";
import { useAuth } from "./hooks/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpinLoading } from "./components/SpinLoading";

export default function App() {
  const [minLoadingTime, setMinLoadingTime] = useState(true);
  const initialize = useAuth((state) => state.initialize);
  const isLoading = useAuth((state) => state.isLoading);

  // cria o QueryClient apenas uma vez
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos
            cacheTime: 1000 * 60 * 30, // 30 minutos
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: 1,
            suspense: false,
          } as any,
        },
      }),
    [],
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
  }, [initialize]);

  // Espera AMBOS: o tempo mínimo E a validação do Firebase
  if (minLoadingTime || isLoading) {
    return <LoadingAnimation />;
  }

  // Depois da verificação, está na hora da inicialização das rotas
  // As páginas serão carregadas de forma lazy com suspense dentro do componente AppRoutes
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense
          fallback={<SpinLoading/>}
        >
          <AppRoutes />
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}
