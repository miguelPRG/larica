import { useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Detail from "../pages/Detail";
import Footer from "../components/Footer";
import type { Restaurant } from "../data/Restaurant";

interface HomePageProps {
  userLocation: { lat: number; log: number };
}

const HomePage: React.FC<HomePageProps> = ({ userLocation }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => setSelectedRestaurant(null);

  const handleLogoClick = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onLogoClick={handleLogoClick} />
      <main className="flex flex-1 p-4">
        {selectedRestaurant ? (
          <Detail restaurant={selectedRestaurant} onBack={handleBack} />
        ) : (
          <div className="flex flex-1 items-center justify-center">
              <Search
                lat={userLocation.lat}
                log={userLocation.log}
                onSelectRestaurant={handleRestaurantSelect}
              />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
