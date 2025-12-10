import { useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Card from "./Card";
import RestaurantItem from "./RestaurantItem";
import TagsFilter from "./TagsFilter";
import ViewToggle from "./ViewToggle";
import MapView from "./MapView";
import type { Restaurant } from "../data/Restaurant";
import { useLocationStore } from "../hooks/useLocationStore";

interface SearchProps {
  lat: number;
  log: number;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

interface PaginatedResponse {
  results: Restaurant[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
  };
}

const Search: React.FC<SearchProps> = ({ lat, log, onSelectRestaurant }) => {
  const place = useLocationStore((state) => state.place);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  
  // Verifica se as coordenadas são inválidas (0, 0)
  const hasInvalidLocation = lat === 0 && log === 0;
  
  const { 
    data, 
    isLoading, 
    isError, 
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedResponse>({
    queryKey: ["restaurants", lat, log],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `http://localhost:8000/restaurantes?lat=${lat}&lon=${log}&page=${pageParam}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar restaurantes");
      }

      return response.json() as Promise<PaginatedResponse>;
    },
    getNextPageParam: (lastPage) => {
      // Se a página atual é menor que o total de páginas, retorna a próxima página
      if (lastPage.pagination.currentPage < lastPage.pagination.totalPages) {
        return lastPage.pagination.currentPage + 1;
      }
      // Caso contrário, retorna undefined (não há mais páginas)
      return undefined;
    },
    initialPageParam: 1,
    enabled: !hasInvalidLocation, // Só faz a query se as coordenadas forem válidas
  });

  // Agrupa todos os restaurantes de todas as páginas
  const allRestaurants = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  const uniqueTypes = useMemo(() => {
    const types = allRestaurants.flatMap((r) => r.types);
    return Array.from(new Set(types)).sort();
  }, [allRestaurants]);

  const filteredRestaurants = useMemo(() => {
    let filtered = allRestaurants;

    if (selectedType) filtered = filtered.filter((r) => r.types.includes(selectedType));

    const term = searchTerm.toLowerCase().trim();
    if (term) filtered = filtered.filter((r) => r.name.toLowerCase().includes(term));

    return filtered.sort((a, b) => b.rating - a.rating);
  }, [allRestaurants, searchTerm, selectedType]);

  const handleTypeClick = (type: string | null) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Se as coordenadas são inválidas, mostra carinha triste
  if (hasInvalidLocation) {
    return (
      <div className="w-full max-w-7xl mx-auto transition-all duration-500">
        <Card title="Ops!" subtitle="Não conseguimos encontrar a sua localização">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-9xl mb-6">😔</div>
            <p className="text-xl text-light-two text-center max-w-md">
              Não foi possível obter a sua localização. Por favor, verifique as suas permissões ou tente novamente mais tarde.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto transition-all duration-500">
      <Card title={`Encontre o seu restaurante em ${place}`} subtitle="Explore as 10 melhores opções gastronômicas!">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div
              className="
                w-16 h-16 
                border-4 
                border-light-three 
                border-t-primary-main 
                rounded-full 
                animate-spin
              "
            ></div>
          </div>
        )}
        {isError && <p>Erro ao carregar dados da API.</p>}

        {!isLoading && !isError && (
          <>
            <div className="relative mb-6 max-w-2xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Busque por nome ou tipo..."
                className="w-full rounded-full px-4 py-3 bg-dark-one border border-dark-four text-light-main"
              />
            </div>

            <TagsFilter
              cuisines={uniqueTypes}
              selectedCuisine={selectedType}
              onCuisineSelect={handleTypeClick}
            />

            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

            {filteredRestaurants.length > 0 ? (
              viewMode === "list" ? (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredRestaurants.map((r) => (
                      <RestaurantItem
                        key={r.place_id}
                        restaurant={r}
                        onClick={() => onSelectRestaurant(r)}
                      />
                    ))}
                  </div>
                  {isFetchingNextPage && (
                    <div className="mt-10 flex justify-center py-8">
                      <div
                        className="
                          w-16 h-16 
                          border-4 
                          border-light-three 
                          border-t-primary-main 
                          rounded-full 
                          animate-spin
                        "
                      ></div>
                    </div>
                  )}
                </>
              ) : (
                <MapView restaurants={filteredRestaurants} />
              )
            ) : (
              <p className="text-center py-6">Nenhum restaurante encontrado.</p>
            )}

            {viewMode === "list" && hasNextPage && (
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => fetchNextPage()} 
                  disabled={isFetchingNextPage}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFetchingNextPage ? "Carregando..." : "Mais registros"}
                </button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default Search;