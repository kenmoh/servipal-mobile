import { mapboxClient } from "./client";

export const fetchSuggestions = async (query: string) => {
  const response = await mapboxClient.get(
    `/geocoding/v5/mapbox.places/${query}.json?country=ng&limit=5&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
  );

  return response?.data.features;
};

export const fetchTravelTime = async (
  originCoords: [number, number],
  destinationCoords: [number, number]
) => {
  const response = await mapboxClient.get(
    `/directions/v5/mapbox/driving/${originCoords[0]},${originCoords[1]};${destinationCoords[0]},${destinationCoords[1]}?alternatives=false&continue_straight=false&geometries=geojson&overview=full&steps=false&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
  );

  return response.data.routes;
};

// https://api.mapbox.com/directions/v5/{profile}/{coordinates}
