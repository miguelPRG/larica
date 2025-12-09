import React, { useState, useMemo } from "react";
import Card from "./Card";
import RestaurantItem from "./RestaurantItem";
import TagsFilter from "./TagsFilter";
import ViewToggle from "./ViewToggle";
import MapView from "./MapView";
import { useRestaurants } from "../hooks/useRestaurants";
import type { Restaurant } from "../data/Restaurant";

// Props do componente: recebe latitude, longitude e callback para restaurante completo
interface SearchProps {
  lat: number;
  log: number;
  onSelectRestaurant: (restaurant: Restaurant) => void; // envia objeto completo
}

const Search: React.FC<SearchProps> = ({ lat, log, onSelectRestaurant }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const { data: restaurants = [], isLoading, isError } = useRestaurants(lat, log);

  const uniqueTypes = useMemo(() => {
    const types = restaurants.flatMap((r) => r.types);
    return Array.from(new Set(types)).sort();
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    if (selectedType) filtered = filtered.filter((r) => r.types.includes(selectedType));

    const term = searchTerm.toLowerCase().trim();
    if (term) filtered = filtered.filter((r) => r.name.toLowerCase().includes(term));

    return filtered.sort((a, b) => b.rating - a.rating).slice(0, 50);
  }, [restaurants, searchTerm, selectedType]);

  const displayedRestaurants =
    viewMode === "list" ? filteredRestaurants.slice(0, visibleCount) : filteredRestaurants;

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);

  const handleTypeClick = (type: string | null) => {
    setSelectedType((prev) => (prev === type ? null : type));
    setVisibleCount(4);
  };

  return (
    <div className="w-full max-w-7xl mx-auto transition-all duration-500">
      <Card title="Encontre o seu restaurante" subtitle="Explore as 10 melhores opções gastronômicas!">
        {isLoading && <p>Carregando restaurantes...</p>}
        {isError && <p>Erro ao carregar dados da API.</p>}

        {!isLoading && !isError && (
          <>
            {/* Barra de busca */}
            <div className="relative mb-6 max-w-2xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(4);
                }}
                placeholder="Busque por nome ou tipo..."
                className="w-full rounded-full px-4 py-3 bg-dark-one border border-dark-four text-light-main"
              />
            </div>

            {/* Filtro de tipos */}
            <TagsFilter
              cuisines={uniqueTypes}
              selectedCuisine={selectedType}
              onCuisineSelect={handleTypeClick}
            />

            {/* Alternância Lista ↔ Mapa */}
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

            {/* Lista ou mapa */}
            {displayedRestaurants.length > 0 ? (
              viewMode === "list" ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {displayedRestaurants.map((r) => (
                    <RestaurantItem
                      key={r.place_id}
                      restaurant={r}
                      onClick={() => onSelectRestaurant(r)} // envia objeto completo
                    />
                  ))}
                </div>
              ) : (
                <MapView restaurants={displayedRestaurants} />
              )
            ) : (
              <p className="text-center py-6">Nenhum restaurante encontrado.</p>
            )}

            {viewMode === "list" && visibleCount < filteredRestaurants.length && (
              <div className="mt-10 flex justify-center">
                <button onClick={handleLoadMore} className="btn-primary">
                  Mais registros
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