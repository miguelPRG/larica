import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Restaurant } from "../data/Restaurant";

// Corrige o problema dos ícones padrão do Leaflet quando usado com bundlers
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Configuração do ícone padrão
let DefaultIcon = L.icon({
  iconUrl: icon,          // ícone do marcador
  shadowUrl: iconShadow,  // sombra do marcador
  iconSize: [25, 41],     // tamanho do ícone
  iconAnchor: [12, 41],   // ponto do ícone que corresponde à posição geográfica
  popupAnchor: [1, -34],  // ponto do popup em relação ao ícone
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

// Aplica o ícone padrão em todos os marcadores
L.Marker.prototype.options.icon = DefaultIcon;

// Props do componente MapView
interface MapViewProps {
  restaurants: Restaurant[];                       // lista de restaurantes para exibir no mapa
  onSelectRestaurant?: (restaurant: Restaurant) => void; // callback opcional quando usuário clica em "Ver Detalhes"
}

// Componente auxiliar para atualizar os limites do mapa conforme restaurantes
const MapUpdater: React.FC<{ restaurants: Restaurant[] }> = ({ restaurants }) => {
  const map = useMap();

  useEffect(() => {
    if (restaurants.length === 0) return; // se não houver restaurantes, não faz nada

    // Cria bounds com todos os restaurantes
    const bounds = L.latLngBounds(
      restaurants.map((r) => [r.geometry.location.lat, r.geometry.location.lng])
    );

    if (restaurants.length === 1) {
      // Se houver apenas um restaurante, centraliza com zoom 16
      map.setView([restaurants[0].geometry.location.lat, restaurants[0].geometry.location.lng], 16);
    } else {
      // Se houver mais de um, ajusta os limites do mapa para caber todos
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [restaurants, map]);

  return null; // este componente não renderiza nada, apenas atualiza o mapa
};

// Componente principal do mapa
const MapView: React.FC<MapViewProps> = ({ restaurants, onSelectRestaurant }) => {
  
  // Ponto inicial padrão (Aveiro) caso não haja restaurantes
  const defaultPosition: [number, number] = [40.6405, -8.6538];

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-xl border border-gray-200 shadow-inner dark:border-gray-700 relative z-0">
      <MapContainer
        center={defaultPosition}   // posição inicial do mapa
        zoom={13}                  // zoom inicial
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        {/* TileLayer do OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Atualiza os limites do mapa com base nos restaurantes */}
        <MapUpdater restaurants={restaurants} />

        {/* Renderiza marcadores para cada restaurante */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.place_id} // use place_id como key única
            position={[restaurant.geometry.location.lat, restaurant.geometry.location.lng]}
          >
            <Popup>
              <div className="text-center ">
                {/* Exibe a foto do restaurante, se houver */}
                {restaurant.photos?.[0] && (
                  <img
                    src={`https://larica-backend.onrender.com/get-image?photo_reference=${restaurant.photos?.[0]?.photo_reference}`}
                    alt={restaurant.name}
                  />
                )}

                {/* Nome do restaurante */}
                <h3 className="font-bold text-gray-800 text-sm">{restaurant.name}</h3>

                {/* Tipos/categorias do restaurante */}
                <p className="text-xs text-gray-600 mb-1">{restaurant.types.join(", ")}</p>

                {/* Avaliação */}
                <div className="text-yellow-500 text-xs font-bold mb-2">★ {restaurant.rating}</div>

                {/* Botão opcional para detalhes */}
                {onSelectRestaurant && (
                  <button
                    onClick={() => onSelectRestaurant(restaurant)}
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
}

export default MapView;