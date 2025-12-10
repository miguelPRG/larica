import React from "react";
import MapView from "../components/MapView";
import type { Restaurant } from "../data/Restaurant";

// Props do componente
interface DetailProps {
  restaurant: Restaurant;
  onBack: () => void;
}

const Detail: React.FC<DetailProps> = ({ restaurant, onBack }) => {
  if (!restaurant) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Nenhum restaurante selecionado
        </h2>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:underline dark:text-blue-400"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-4 pb-20">
      {/* Botão Voltar */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar para a busca
      </button>

      {/* Hero Image */}
      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-3xl shadow-xl sm:h-96">
        <img src={`https://larica-backend.onrender.com/get-image?photo_reference=${restaurant.photos?.[0]?.photo_reference}`} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0  from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 sm:p-10">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {restaurant.name}
          </h1>
        </div>
      </div>

      {/* Informações gerais */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-lg bg-yellow-100 px-3 py-1.5 dark:bg-yellow-900/30">
              ⭐ <span className="font-bold text-yellow-700 dark:text-yellow-400">{restaurant.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {restaurant.userRatingsTotal}
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Localização</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-700">
            <MapView restaurants={[restaurant]} />
          </div>
        </div>

        {/* Contato */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">Informações de Contato</h3>
            <div className="flex flex-col space-y-5">
              {restaurant.internationalPhoneNumber && (
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  📞 {restaurant.internationalPhoneNumber}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300">
                🏷️ Nome: {restaurant.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                📍 Endereço: {restaurant.vicinity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
