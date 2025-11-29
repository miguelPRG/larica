import React, { useState, useMemo } from 'react';
import Card from './Card';
import RestaurantItem from './RestaurantItem';
import TagsFilter from './TagsFilter';
import ViewToggle from './ViewToggle';
import MapView from './MapView';
import { restaurants } from '../data/restaurants';

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

interface SearchProps {
    onSelectRestaurant: (id: number) => void;
}

const Search: React.FC<SearchProps> = ({ onSelectRestaurant }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Extract unique cuisines for tags
  const uniqueCuisines = useMemo(() => {
    const cuisines = restaurants.map((r) => r.cuisine);
    return Array.from(new Set(cuisines)).sort();
  }, []);

  // Filter restaurants based on search term and selected cuisine
  // And limit to Top 10 by Rating
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    // Filter by Cuisine Tag
    if (selectedCuisine) {
      filtered = filtered.filter((r) => r.cuisine === selectedCuisine);
    }

    // Filter by Search Term
    const lowerTerm = searchTerm.toLowerCase().trim();
    if (lowerTerm) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerTerm) ||
          r.description.toLowerCase().includes(lowerTerm) ||
          r.cuisine.toLowerCase().includes(lowerTerm)
      );
    }
    
    // Sort by Rating (Descending) and take Top 10
    return filtered.sort((a, b) => b.rating - a.rating).slice(0, 10);
  }, [searchTerm, selectedCuisine]);

  // Pagination: get current slice for LIST view only
  // For Map view, we usually want to show all filtered results
  const displayedRestaurants = viewMode === 'list' 
    ? filteredRestaurants.slice(0, visibleCount) 
    : filteredRestaurants;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleCuisineClick = (cuisine: string | null) => {
    if (selectedCuisine === cuisine) {
        setSelectedCuisine(null); // Toggle off if clicking the same active tag
    } else {
        setSelectedCuisine(cuisine);
    }
    setVisibleCount(4); // Reset pagination to initial view
  };

  return (
    <div className="w-full max-w-7xl mx-auto transition-all duration-500">

      teste

      
      <Card
        title="Encontre o seu restaurante"
        subtitle="Explore as 10 melhores opções gastronômicas, veja avaliações e escolha onde comer!"
      >
        {/* Search Bar */}
        <div className="relative mb-6 max-w-2xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(4); // Reset pagination on search
            }}
            placeholder="Busque por nome, culinária ou descrição..."
            className="w-full rounded-full border-2 border-transparent bg-gray-100 py-3 pl-5 pr-14 text-gray-800 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:bg-gray-800"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 p-2 text-white">
            <SearchIcon className="h-6 w-6" />
          </div>
        </div>

        {/* Cuisine Tags Component */}
        <TagsFilter 
            cuisines={uniqueCuisines}
            selectedCuisine={selectedCuisine}
            onCuisineSelect={handleCuisineClick}
        />

        {/* View Toggle */}
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

        {/* Content */}
        {displayedRestaurants.length > 0 ? (
          viewMode === 'list' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedRestaurants.map((restaurant) => (
                <RestaurantItem 
                    key={restaurant.id} 
                    restaurant={restaurant} 
                    onSelect={() => onSelectRestaurant(restaurant.id)}
                />
              ))}
            </div>
          ) : (
            <MapView 
              restaurants={displayedRestaurants} 
              onSelectRestaurant={onSelectRestaurant}
            />
          )
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <SearchIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nenhum restaurante encontrado</h3>
            <p className="text-gray-500 dark:text-gray-400">
                Tente ajustar sua busca ou filtros para encontrar o que procura.
            </p>
            <button 
                onClick={() => {setSearchTerm(''); setSelectedCuisine(null);}}
                className="mt-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
                Limpar todos os filtros
            </button>
          </div>
        )}

        {/* Load More Button - Only for List View */}
        {viewMode === 'list' && visibleCount < filteredRestaurants.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="group relative overflow-hidden rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <span className="relative z-10 flex items-center gap-2">
                Mais registros
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Search;