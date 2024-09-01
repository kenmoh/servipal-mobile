import client from "@/api/client";
import { ApiResponse } from "apisauce";

import { CreateListingType, ListingResponseType } from "@/utils/types";

const endpoint = "/listings";

export type ItemInfo = {
  quantity: number;
  additionalInfo: string;
};

// Get all item listings
export const getItemListings = async () => await client.get(`${endpoint}`);

// Add Item
export const addListing = async (
  item: CreateListingType
): Promise<ListingResponseType> => {
  const data = new FormData();
  data.append("name", item.name);
  data.append("price", item.price);
  data.append("stock", item.stock);
  data.append("description", item.description);
  data.append("image", {
    type: "image/jpeg",
    uri: item.image,
    name: item.image.split("/").slice(-1)[0],
  });

  // Handle multiple images
  if (Array.isArray(item.images)) {
    item.images.forEach((imagePath) => {
      data.append("images", {
        type: "image/jpeg",
        uri: imagePath,
        name: imagePath?.split("/").slice(-1)[0],
      });
    });
  }

  const response: ApiResponse<ListingResponseType> = await client.post(
    `${endpoint}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.data?.detail);
  }
  if (!response.data) {
    throw new Error("Response data is undefined");
  }
  return response?.data;
};

export const makePayment = async (id: number, data: ItemInfo) => {
  const reqData = {
    quantity: data.quantity,
    additional_info: data.additionalInfo,
  };
  const response = await client.post(`${endpoint}/${id}/buy-item`, reqData);

  if (!response.ok) {
    throw new Error(response.data?.detail);
  }

  return response?.data;
};
