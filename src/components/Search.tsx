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
                setVisibleCount(4);
            }}
            placeholder="Busque por nome, culinária ou descrição..."
            className="w-full rounded-full px-4 py-3 bg-dark-one border border-dark-four text-light-main placeholder-dark-three"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-primary-main p-2 text-white">
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
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-dark-two">
                <SearchIcon className="h-8 w-8 text-dark-three" />
            </div>
            <h3 className="text-lg font-medium text-light-main">Nenhum restaurante encontrado</h3>
            <p className="text-dark-three">
                Tente ajustar sua busca ou filtros para encontrar o que procura.
            </p>
            <button 
                onClick={() => {setSearchTerm(''); setSelectedCuisine(null);}}
                className="btn-secondary mt-4"
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
              className="btn-primary"
            >
              <span className="flex items-center gap-2">
                Mais registros
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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