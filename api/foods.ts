import client from "@/api/client";

const endpoint = "/food";

// Get all item orders
export const getFoods = async () => await client.get(`${endpoint}`);
