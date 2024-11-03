import client from "@/api/client";
import { ApiResponse } from "apisauce";

import { CreateListingType, ListingResponseType } from "@/utils/types";

const endpoint = "/listings";

export type ItemInfo = {
  quantity: number;
  deliveryInfo: string;
};

interface TransactionResponseType {
  additional_info: string;
  quantity: 1;
  id: string;
  buyer_id: string;
  total_cost: string;
  payment_status: string;
  status: string;
  payment_url: string;
  transaction_date: string;
}

// Get all item listings
export const getItemListings = async () => await client.get(`${endpoint}`);
export const getSelletListings = async () => {
  const response = await client.get(`${endpoint}/seller-listings`);

  if (!response.ok) {
    throw new Error(response?.data?.detail);
  }
  return response?.data;
};

// Add Item
export const addListing = async (
  item: CreateListingType
): Promise<ListingResponseType> => {
  const data = new FormData();
  data.append("name", item.name);
  data.append("price", item.price);
  data.append("stock", item.stock);
  data.append("description", item.description);

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

  // Handle multiple colors
  if (Array.isArray(item.colors)) {
    item.colors.forEach((color) => {
      data.append("colors", color);
    });
  }

  // Handle multiple sizes
  if (Array.isArray(item.sizes)) {
    item.sizes.forEach((size) => {
      data.append("sizes", size);
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
// Add Item
export const updateListing = async (
  item: CreateListingType
): Promise<ListingResponseType> => {
  const data = new FormData();
  data.append("name", item.name);
  data.append("price", item.price);
  data.append("stock", item.stock);
  data.append("description", item.description);

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

  // Handle multiple colors
  if (Array.isArray(item.colors)) {
    item.colors.forEach((color) => {
      data.append("colors", color);
    });
  }

  // Handle multiple sizes
  if (Array.isArray(item.sizes)) {
    item.sizes.forEach((size) => {
      data.append("sizes", size);
    });
  }
  const response: ApiResponse<ListingResponseType> = await client.put(
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
    throw new Error(response.data?.detail.split(":")[1]);
  }

  return response?.data;
};

export const rateItem = async (
  id: string,
  data: { rating: string; comment: string }
) => {
  const ratingData = {
    rating: data.rating,
    comment: data.comment,
  };
  const response = await client.post(`${endpoint}/${id}/rate-item`, ratingData);
  if (!response.ok) {
    throw new Error(response.data?.detail.split(":")[1]);
  }

  return response?.data;
};

export const getItemReviews = async (id: number) => {
  const response = await client.get(`${endpoint}/${id}/listing-ratings`);
  if (!response.ok) {
    throw new Error(response?.data?.detail?.split(":")[1]);
  }
  return response?.data;
};

export const getUserTransactions = async (): Promise<
  TransactionResponseType[]
> => {
  const response = await client.get(`${endpoint}/user-transactions`);
  if (!response.ok) {
    throw new Error(response.data?.detail);
  }

  return response?.data;
};
