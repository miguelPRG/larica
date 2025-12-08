import type { Restaurant } from "../data/Restaurant";

// Função que consulta a API via POST passando lat e lon no body
export async function getRestaurants(lat: number, lon: number): Promise<Restaurant[]> {
    
  const response = await fetch("/api/restaurantes", {
    method: "POST", // muda para POST
    headers: {
      "Content-Type": "application/json", // informa que o body é JSON
    },
    body: JSON.stringify({ lat: lat.toString(), lon: lon.toString() }), // corpo da requisição
  });

  // Trata erro HTTP
  if (!response.ok) {
    throw new Error("Erro ao buscar restaurantes");
  }

  // Retorna o JSON já tipado
  const data = await response.json();
  return data.results; // retorna só o array de restaurantes
}
