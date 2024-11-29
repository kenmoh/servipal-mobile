import * as Location from "expo-location";
import { mapboxClient, hereMapClient, hereMapRouteClient } from "./client";
import { Alert } from "react-native";

type RouteType = {
  routes: Array<{
    id: string;
    sections: Array<{
      id: string;
      type: string;
      actions: Array<{
        action: string;
        duration: number;
        instruction: string;
        offset: number;
      }>;
      departure: {
        time: string;
        place: {
          type: string;
          location: {
            lat: number;
            lng: number;
          };
        };
      };
      arrival: {
        time: string;
        place: {
          type: string;
          location: {
            lat: number;
            lng: number;
          };
        };
      };
      summary: {
        duration: number;
        length: number;
        currentWeight: number;
      };
      polyline: string;
      spans: Array<{
        offset: number;
        names: Array<{
          value: string;
          language: string;
        }>;
        length: number;
      }>;
    }>;
  }>;
};

export type LocationData = {
  address: {
    countryCode: string;
    countryName: string;
    county: string;
    label: string;
    state: string;
  };
  administrativeAreaType: string;
  distance: number;
  id: string;
  language: string;
  mapView: {
    east: number;
    north: number;
    south: number;
    west: number;
  };
  position: {
    lat: number;
    lng: number;
  };
  resultType: string;
  title: string;
};
type HereMapResponse = {
  items: LocationData[];
};

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

export const fetchCoordinatesFromHere = async (
  locationName: string
): Promise<LocationData[]> => {
  const response = await hereMapClient.get<HereMapResponse>(
    `/discover?at=9.0820,8.6753&q=${locationName}&in=countryCode:NGA&apiKey=${process.env.EXPO_PUBLIC_HERE_MAP_API_KEY}`
  );

  return response?.data?.items ?? [];
};

export const getDirections = async (
  origin: [number, number],
  destination: [number, number]
): Promise<number[][]> => {
  try {
    const response = await mapboxClient.get(
      `/directions/v5/mapbox/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}&geometries=geojson`
    );
    console.log(response.data?.routes[0]?.geometry?.coordinates, "FROM API");
    return response?.data?.routes[0]?.geometry?.coordinates || [];
  } catch (error) {
    console.error("Error fetching directionss:", error);
    return [];
  }
};

// GET: https://api.mapbox.com/directions/v5/mapbox/driving/5.105184%2C10.682484%3B6.466009%2C6.950963?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1Ijoia2VubW9oIiwiYSI6ImNsZnpqaG05aDEyMXgzaHF5bzZmM20zeTUifQ.s49M_iu9qk3Gt8lexnDSEw

// export const getDirections = async (
//   origin: [number, number],
//   destination: [number, number]
// ) => {
//   const response = await mapboxClient.get(
//     `/directions/v5/driving/${(origin[0], origin[1])};${
//       (destination[0], destination[1])
//     }`
//   );
//   return response?.data?.routes[0].geometry.coordinates;
// };

// https://api.mapbox.com/directions/v5/{profile}/{coordinates}

// const geocodePlace = async (
//   placeName: string
// ): Promise<PositionData | undefined> => {
//   try {
//     const response = await hereMapGeocodeClient.get<PositionData>(
//       `/geocode?q=${placeName}&apiKey=${process.env.EXPO_PUBLIC_HERE_MAP_API_KEY}`
//     );
//     if (!response?.ok) {
//       throw new Error("Network response was not ok");
//     }

//     console.log(response?.data, "LAT LON");
//     return response?.data?.position
//       ? { position: response.data.position }
//       : undefined;
//   } catch (error) {
//     console.error("Error fetching geocode:", error);
//   }
// };

export const getDistanceAndDuration = async (
  origin: [number, number],
  destination: [number, number]
) => {
  // Request distance using Routing API
  const url = `https://router.hereapi.com/v8/routes?origin=${origin[0]},${origin[1]}&destination=${destination[0]},${destination[1]}&transportMode=scooter&return=summary&apikey=${process.env.EXPO_PUBLIC_HERE_MAP_API_KEY}`;

  try {
    const response = await hereMapRouteClient.get<RouteType>(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const distance = response?.data?.routes[0].sections[0].summary.length;
    const duration = response?.data?.routes[0].sections[0].summary.duration;
    const polyline = response?.data?.routes[0].sections[0].polyline;

    return { distance, duration, polyline };
  } catch (error) {
    console.error("Error fetching distance:", error);
  }
};

export const getCurrentLocation = async (item) => {
  // Request permission to access location
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Permission to access location was denied");
    return;
  }

  // Get the current location
  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  // Update originPoints with current location
  item.originPoints = [latitude, longitude];
  console.log("Current location set to:", item.originPoints);

  // Reverse geocode to get the location name
  let reverseGeocode = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });
  if (reverseGeocode.length > 0) {
    const locationName = `${reverseGeocode[0].city}, ${reverseGeocode[0].region}, ${reverseGeocode[0].country}`;
    console.log("Location name:", locationName);
    Alert.alert("Current Location", locationName); // Show location name in an alert
  } else {
    console.log("No location name found.");
  }
};
