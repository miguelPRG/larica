// Representa a localização do restaurante
export interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
  viewport?: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
}

// Representa uma foto do restaurante
export interface Photo {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
}

// Interface principal do restaurante
export interface Restaurant {
  // ID interno gerado, pois a API não fornece um ID único
  place_id: string;

  // Nome do restaurante
  name: string;

  // Latitude e longitude do restaurante
  lat: number; // latitude
  log: number; // longitude

  // Localização do restaurante
  geometry: Geometry;

  // URL do ícone do restaurante (fallback caso não haja foto)
  icon: string;

  // Lista de fotos do restaurante
  photos?: Photo[];

  // Referência da foto (para gerar URL via Google Photos API)
  photoReference?: string;

  // Descrição resumida do local (usaremos 'vicinity')
  vicinity: string;

  // Avaliação do restaurante
  rating: number;

  // Total de avaliações
  userRatingsTotal: number;

  // Status do negócio (ex: "OPERATIONAL")
  businessStatus: string;

  // Se está aberto agora
  openNow?: boolean;

  // Tipos do local (ex: ["restaurant", "food", "point_of_interest"])
  types: string[];

  // Place ID do Google
  placeId: string;

  // Número de telefone internacional
  internationalPhoneNumber: string;

  // Nível de preço (1-4)
  priceLevel?: number;
}
