import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Restaurant } from "../data/restaurants";

// Fix for default marker icons in Leaflet with bundlers
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  restaurants: Restaurant[];
  onSelectRestaurant?: (id: number) => void;
}

// Component to handle map bounds updates
const MapUpdater: React.FC<{ restaurants: Restaurant[] }> = ({ restaurants }) => {
  const map = useMap();

  useEffect(() => {
    if (restaurants.length === 0) return;

    const bounds = L.latLngBounds(restaurants.map((r) => [r.latitude, r.longitude]));

    // If it's a single point, set view with zoom
    if (restaurants.length === 1) {
      map.setView([restaurants[0].latitude, restaurants[0].longitude], 16);
    } else {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [restaurants, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({ restaurants, onSelectRestaurant }) => {
  // Default center (Aveiro) if no restaurants
  const defaultPosition: [number, number] = [40.6405, -8.6538];

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-xl border border-gray-200 shadow-inner dark:border-gray-700 relative z-0">
      <MapContainer center={defaultPosition} zoom={13} style={{ height: "100%", width: "100%" }} className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater restaurants={restaurants} />

        {restaurants.map((restaurant) => (
          <Marker key={restaurant.id} position={[restaurant.latitude, restaurant.longitude]}>
            <Popup>
              <div className="text-center min-w-[160px]">
                <img src={restaurant.image} className="w-full h-24 object-cover rounded mb-2" alt={restaurant.name} />
                <h3 className="font-bold text-gray-800 text-sm">{restaurant.name}</h3>
                <p className="text-xs text-gray-600 mb-1">{restaurant.cuisine}</p>
                <div className="text-yellow-500 text-xs font-bold mb-2">★ {restaurant.rating}</div>

                {onSelectRestaurant && (
                  <button
                    onClick={() => onSelectRestaurant(restaurant.id)}
                    className="w-full rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none"
                  >
                    Ver Detalhes
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
