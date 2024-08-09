import client from "@/api/client";
import { AddMealType } from "@/utils/types";

const food = "/food";
const user = "/users";

// Get all item orders
export const getFoods = async () => await client.get(`${food}`);
export const getFoodCategories = async () =>
  await client.get(`${food}/category`);
export const getCategories = async () => await client.get(`${food}/category`);
export const getUserByMealCategory = async (
  category?: string | string[] | null
) => {
  let query = "";
  if (typeof category === "string") {
    query = `?category=${category}`;
  } else if (Array.isArray(category)) {
    query = `?${category.map((c) => `category=${c}`).join("&")}`;
  }
  const response = await client.get(
    `${user}/get-user-by-meal-category${query}`
  );

  return response;
};
export const getRestaurantMeals = async (userId: string) =>
  await client.get(`${food}/${userId}/restaurant-food`);

// Add Meal
export const addMeal = async (meal: AddMealType) => {
  const data = new FormData();
  data.append("name", meal.name);
  data.append("price", meal.price);
  data.append("category", meal.category);
  data.append("side", meal.side!);
  data.append("ingredients", meal.ingredients!);
  data.append("image", {
    type: "image/jpeg",
    uri: meal.image,
    name: meal.image.split("/").slice(-1)[0],
  });

  const response = await client.post(`${food}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (!response.ok) {
    throw new Error(response.data?.detail);
  }
  return response.data;
};
