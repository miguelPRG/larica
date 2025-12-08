import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../services/restaurantService";

// Hook para buscar restaurantes baseado em latitude e longitude
export function useRestaurants(lat: number, log: number) {
  return useQuery({
    
    // A chave do cache depende de lat e log → muda = busca novamente
    queryKey: ["restaurants", lat, log],

    // Função de busca chamando o service
    queryFn: () => getRestaurants(lat, log),

    // Só executa automaticamente se os valores forem válidos
    enabled: !!lat && !!log,

    // Tempo em que os dados ficam frescos (sem refetch)
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}
