import { useState, useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Detail from "../pages/Detail";
import Footer from "../components/Footer";
import type { Restaurant } from "../data/Restaurant";

interface HomePageProps {
  userLocation: { lat: number; log: number };
}

const HomePage: React.FC<HomePageProps> = ({ userLocation }) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Obter localização atual do usuário
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        // Usar localização padrão ou do userLocation prop
        setCoords({
          lat: userLocation.lat,
          lon: userLocation.log,
        });
      }
    );
  }, [userLocation]);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => setSelectedRestaurant(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 p-4">
        {selectedRestaurant ? (
          <Detail restaurant={selectedRestaurant} onBack={handleBack} />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            {coords && (
              <Search
                lat={coords.lat}
                log={coords.lon}
                onSelectRestaurant={handleRestaurantSelect}
              />
            )}
            {!coords && <p>Carregando localização...</p>}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
