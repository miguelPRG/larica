import React, { useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Detail from "../pages/Detail";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);

  const handleRestaurantSelect = (id: number) => {
    setSelectedRestaurantId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedRestaurantId(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 p-4">
        {selectedRestaurantId ? (
          <Detail restaurantId={selectedRestaurantId} onBack={handleBack} />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <Search onSelectRestaurant={handleRestaurantSelect} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
