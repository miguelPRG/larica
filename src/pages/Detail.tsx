import React from "react";
import { restaurants } from "../data/restaurants";
import MapView from "../components/MapView";

interface DetailProps {
  restaurantId: number;
  onBack: () => void;
}

// Simple icons for contact details
const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const Detail: React.FC<DetailProps> = ({ restaurantId, onBack }) => {
  const restaurant = restaurants.find((r) => r.id === restaurantId);

  if (!restaurant) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Restaurante não encontrado</h2>
        <button onClick={onBack} className="mt-4 text-blue-600 hover:underline dark:text-blue-400">
          Voltar para a lista
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl animate-fade-in p-4 pb-20">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="group mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transition-transform group-hover:-translate-x-1"
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
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 sm:p-10">
          <span className="mb-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
            {restaurant.cuisine}
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl md:text-6xl">{restaurant.name}</h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Info & Description */}
        <div className="lg:col-span-2">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-lg bg-yellow-100 px-3 py-1.5 dark:bg-yellow-900/30">
              <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-yellow-700 dark:text-yellow-400">{restaurant.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Excelente escolha</span>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Sobre o restaurante</h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {restaurant.description}
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>

          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Localização</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-700">
            <MapView restaurants={[restaurant]} />
          </div>
        </div>

        {/* Right Column: Contact Information */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">Informações de Contato</h3>
            <div className="flex flex-col space-y-5">
              {restaurant.website && (
                <a
                  href={`https://${restaurant.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <div className="rounded-full bg-blue-50 p-2 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:group-hover:bg-blue-900/40">
                    <GlobeIcon className="h-5 w-5" />
                  </div>
                  <span className="break-all pt-1.5 font-medium">{restaurant.website}</span>
                </a>
              )}

              {restaurant.phone && (
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <div className="rounded-full bg-blue-50 p-2 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:group-hover:bg-blue-900/40">
                    <PhoneIcon className="h-5 w-5" />
                  </div>
                  <span className="pt-1.5 font-medium">{restaurant.phone}</span>
                </a>
              )}

              {restaurant.email && (
                <a
                  href={`mailto:${restaurant.email}`}
                  className="group flex items-start gap-3 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <div className="rounded-full bg-blue-50 p-2 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:group-hover:bg-blue-900/40">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <span className="pt-1.5 font-medium">{restaurant.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
