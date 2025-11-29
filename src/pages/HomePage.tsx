import React, { useState } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Detail from '../pages/Detail';

const HomePage: React.FC = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);

  const handleRestaurantSelect = (id: number) => {
    setSelectedRestaurantId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedRestaurantId(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800 antialiased dark:bg-gray-900 dark:text-gray-200">
      <Header />
      <main className="flex flex-1 flex-col p-4">
        {selectedRestaurantId ? (
          <Detail restaurantId={selectedRestaurantId} onBack={handleBack} />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <Search onSelectRestaurant={handleRestaurantSelect} />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
