
export interface Restaurant {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  cuisine: string;
  latitude: number;
  longitude: number;
  website?: string;
  phone?: string;
  email?: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Salpoente",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=60",
    description: "Culinária portuguesa contemporânea em um antigo armazém de sal renovado.",
    rating: 4.9,
    cuisine: "Portuguesa",
    latitude: 40.640506,
    longitude: -8.653783,
    website: "www.salpoente.pt",
    phone: "+351 234 382 674",
    email: "reservas@salpoente.pt"
  },
  {
    id: 2,
    name: "O Bairro",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=60",
    description: "Pratos locais com um toque moderno no coração de Aveiro.",
    rating: 4.8,
    cuisine: "Portuguesa",
    latitude: 40.641200,
    longitude: -8.654500,
    website: "www.obairro.pt",
    phone: "+351 234 423 123",
    email: "geral@obairro.pt"
  },
  {
    id: 3,
    name: "Subenshi Sushi",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=60",
    description: "Sushi de alta qualidade com vista para os canais da ria.",
    rating: 4.9,
    cuisine: "Japonesa",
    latitude: 40.642800,
    longitude: -8.656200,
    website: "www.subenshi.pt",
    phone: "+351 964 123 456",
    email: "aveiro@subenshi.pt"
  },
  {
    id: 4,
    name: "Cais do Pescado",
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=500&q=60",
    description: "Especialidade em peixes frescos e mariscos da região.",
    rating: 4.7,
    cuisine: "Frutos do Mar",
    latitude: 40.643500,
    longitude: -8.652000,
    website: "www.caisdopescado.pt",
    phone: "+351 234 000 001",
    email: "info@caisdopescado.pt"
  },
  {
    id: 5,
    name: "O Batel",
    image: "https://images.unsplash.com/photo-1550966871-3ed3c6221741?auto=format&fit=crop&w=500&q=60",
    description: "Ambiente acolhedor servindo o melhor da cozinha tradicional.",
    rating: 4.6,
    cuisine: "Portuguesa",
    latitude: 40.639800,
    longitude: -8.651000,
    website: "www.obatel.pt",
    phone: "+351 234 000 002",
    email: "contacto@obatel.pt"
  },
  {
    id: 6,
    name: "Taco Loco Aveiro",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=60",
    description: "Sabores picantes e vibrantes do México perto da universidade.",
    rating: 4.4,
    cuisine: "Mexicana",
    latitude: 40.630500,
    longitude: -8.657500,
    website: "www.tacoloco.pt",
    phone: "+351 234 000 003",
    email: "ola@tacoloco.pt"
  },
  {
    id: 7,
    name: "Burger Corner",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
    description: "Hambúrgueres artesanais suculentos e batatas rústicas.",
    rating: 4.5,
    cuisine: "Americana",
    latitude: 40.638200,
    longitude: -8.649500,
    website: "www.burgercorner.pt",
    phone: "+351 234 000 004",
    email: "pedidos@burgercorner.pt"
  },
  {
    id: 9,
    name: "Pizzaria Mamma Mia",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60",
    description: "Pizza em forno a lenha com ingredientes italianos importados.",
    rating: 4.8,
    cuisine: "Italiana",
    latitude: 40.637000,
    longitude: -8.655000,
    website: "www.mammamia-aveiro.pt",
    phone: "+351 234 000 006",
    email: "ciao@mammamia.pt"
  },
  {
    id: 10,
    name: "Green Life",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60",
    description: "Opções saudáveis, vegetarianas e veganas com produtos locais.",
    rating: 4.9,
    cuisine: "Vegetariana",
    latitude: 40.641500,
    longitude: -8.650500,
    website: "www.greenlife.pt",
    phone: "+351 234 000 007",
    email: "veggie@greenlife.pt"
  },
  {
    id: 11,
    name: "Maré Cheia",
    image: "https://images.unsplash.com/photo-1599084993091-1a820b2f652f?auto=format&fit=crop&w=500&q=60",
    description: "Vista para a ria e os melhores mariscos da costa.",
    rating: 4.6,
    cuisine: "Frutos do Mar",
    latitude: 40.645500,
    longitude: -8.659000,
    website: "www.marecheia.pt",
    phone: "+351 234 000 008",
    email: "reservas@marecheia.pt"
  },
  {
    id: 12,
    name: "Padaria Central",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=60",
    description: "Os famosos ovos moles de Aveiro e pão fresco todos os dias.",
    rating: 4.8,
    cuisine: "Padaria",
    latitude: 40.640200,
    longitude: -8.653200,
    website: "www.padariacentral.pt",
    phone: "+351 234 000 009",
    email: "encomendas@padariacentral.pt"
  },
  {
    id: 13,
    name: "Steakhouse Aveiro",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=500&q=60",
    description: "Carnes maturadas grelhadas à perfeição.",
    rating: 4.7,
    cuisine: "Steakhouse",
    latitude: 40.636500,
    longitude: -8.648000,
    website: "www.steakhouseaveiro.pt",
    phone: "+351 234 000 010",
    email: "grill@steakhouse.pt"
  },
  {
    id: 14,
    name: "Wok & Roll",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=60",
    description: "Comida asiática rápida e saborosa perto do Fórum.",
    rating: 4.3,
    cuisine: "Chinesa",
    latitude: 40.639000,
    longitude: -8.647000,
    website: "www.wokroll.pt",
    phone: "+351 234 000 011",
    email: "takeaway@wokroll.pt"
  },
  {
    id: 15,
    name: "La Bodeguita",
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=500&q=60",
    description: "Tapas espanholas e vinhos ibéricos.",
    rating: 4.5,
    cuisine: "Espanhola",
    latitude: 40.642200,
    longitude: -8.652500,
    website: "www.labodeguita.pt",
    phone: "+351 234 000 012",
    email: "tapas@labodeguita.pt"
  },
  {
    id: 16,
    name: "Café da Praça",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=500&q=60",
    description: "Café histórico na Praça do Peixe.",
    rating: 4.6,
    cuisine: "Café",
    latitude: 40.643800,
    longitude: -8.654800,
    website: "www.cafedapraca.pt",
    phone: "+351 234 000 013",
    email: "cafe@praca.pt"
  },
  {
    id: 17,
    name: "Gelataria Veneza",
    image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=500&q=60",
    description: "Gelados artesanais perfeitos para um passeio à beira-rio.",
    rating: 4.9,
    cuisine: "Sorveteria",
    latitude: 40.641000,
    longitude: -8.654000,
    website: "www.gelatariaveneza.pt",
    phone: "+351 234 000 014",
    email: "gelados@veneza.pt"
  },
  {
    id: 18,
    name: "Tasquinha do Tio",
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=500&q=60",
    description: "Petiscos portugueses e ambiente familiar.",
    rating: 4.5,
    cuisine: "Portuguesa",
    latitude: 40.644500,
    longitude: -8.651500,
    website: "www.tasquinhadotio.pt",
    phone: "+351 234 000 015",
    email: "tio@tasquinha.pt"
  },
  {
    id: 19,
    name: "Bangkok Street",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=500&q=60",
    description: "Autêntico Pad Thai e caril.",
    rating: 4.6,
    cuisine: "Tailandesa",
    latitude: 40.635500,
    longitude: -8.650000,
    website: "www.bangkokstreet.pt",
    phone: "+351 234 000 016",
    email: "thai@bangkok.pt"
  },
  {
    id: 20,
    name: "Restaurante O Grego",
    image: "https://images.unsplash.com/photo-1511690656952-34342d2c7135?auto=format&fit=crop&w=500&q=60",
    description: "Sabores mediterrâneos no centro de Aveiro.",
    rating: 4.7,
    cuisine: "Grega",
    latitude: 40.639500,
    longitude: -8.655500,
    website: "www.ogrego.pt",
    phone: "+351 234 000 017",
    email: "opa@ogrego.pt"
  },
   {
    id: 21,
    name: "Ramen House Aveiro",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=60",
    description: "Ramen quente e reconfortante para os dias frios.",
    rating: 4.8,
    cuisine: "Japonesa",
    latitude: 40.637500,
    longitude: -8.652800,
    website: "www.ramenhouse.pt",
    phone: "+351 234 000 018",
    email: "slurp@ramenhouse.pt"
  }
];
