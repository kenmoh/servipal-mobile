import { create } from "apisauce";

import authStorage from "@/auth/storage";

const apiClient = create({
  baseURL: "https://quickpickup.onrender.com/api",
  // baseURL: "https://mohdelivery.onrender.com/api",
});

export const mapboxClient1 = create({
  baseURL: "https://api.mapbox.com/search/geocode/v6",
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
