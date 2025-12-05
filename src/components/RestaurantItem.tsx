import React from "react";
import type { Restaurant } from "../data/restaurants";

interface RestaurantItemProps {
  restaurant: Restaurant;
  onSelect: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs font-semibold text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
    </div>
  );
};

const RestaurantItem: React.FC<RestaurantItemProps> = ({ restaurant, onSelect }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="relative h-40 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-gray-800 backdrop-blur-sm dark:bg-black/80 dark:text-white">
          {restaurant.cuisine}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 dark:text-white">{restaurant.name}</h3>
        </div>

        <div className="mb-3">
          <StarRating rating={restaurant.rating} />
        </div>

        <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">{restaurant.description}</p>

        <button
          onClick={onSelect}
          className="mt-auto w-full rounded-lg bg-blue-50 px-4 py-2 text-center text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default RestaurantItem;
