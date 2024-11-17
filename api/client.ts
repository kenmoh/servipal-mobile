import { create } from "apisauce";

import authStorage from "@/auth/storage";

const apiClient = create({
  baseURL: "https://quickpickup.onrender.com/api",
  // baseURL: "https://mohdelivery.onrender.com/api",
});

export const hereMapClient = create({
  baseURL: "https://discover.search.hereapi.com/v1",
});

export const hereMapRouteClient = create({
  baseURL: "https://router.hereapi.com/v8",
});
export const hereMapGeocodeClient = create({
  baseURL: "https://geocode.search.hereapi.com/v1",
});

export const mapboxClient = create({
  baseURL: "https://api.mapbox.com",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers!["Authorization"] = "Bearer " + authToken;
});

export default apiClient;
