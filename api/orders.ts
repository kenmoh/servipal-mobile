import client from "@/api/client";
import { OrderData } from "@/auth/cartContext";
import { CreateOrderType, Dispute } from "@/utils/types";

const endpoint = "/orders";

// Get all item orders
const getItemOrders = async () => await client.get(`${endpoint}/item-orders`);

// Get food orders
const getFoodOrders = async () => await client.get(`${endpoint}/food-orders`);

// Get laundry orders
const getLaundryOrders = async () => {
  const result = await client.get(`${endpoint}/laundry-orders`);
  if (!result.ok) {
    throw new Error(result.data?.detail?.split(":")[1]);
  }
  return result.data;
};

// Current user Item orders
const getUserOrderItems = async () => {
  const result = await client.get(`${endpoint}/user-item-orders`);
  if (!result.ok) {
    throw new Error(result.data?.detail?.split(":")[1]);
  }
  return result.data;
};
// Current user Restaurant orders
const getUserRestaurantOrderItems = async (
  pageSize: number,
  pageNumber: number
) => {
  const result = await client.get(
    `${endpoint}/user-food-orders?page_size=${pageSize}&page_number=${pageNumber}`
  );
  if (!result.ok) {
    throw new Error(result.data?.detail?.split(":")[1]);
  }
  return result.data;
};
// Current user Laundry orders
const getUserLaundryOrderItems = async () => {
  const result = await client.get(`${endpoint}/user-laundry-orders`);
  if (!result.ok) {
    throw new Error(result.data?.detail?.split(":")[1]);
  }
  return result.data;
};

// Get vendor new food orders
const getUserNewFoodOrder = async () => {
  const result = await client.get(`${endpoint}/new-food-orders`);
  if (!result.ok) {
    throw new Error(result.data?.detail?.split(":")[1]);
  }
  return result;
};

// Get vendor new laundry orders
const getLaundryNewLaundryOrder = async () => {
  const result = await client.get(`${endpoint}/new-laundry-orders`);
  if (!result.ok) {
    throw new Error(result.data?.detail?.split(":")[1]);
  }
  return result;
};

// Get order by Dispatch
const getUserListings = () => client.get(`${endpoint}/user-orders`);

// Get user order stats
const getUserOrderStats = async () => {
  const result = await client.get(`${endpoint}/user-order-stats`);

  if (!result.data) {
    throw new Error(result?.data?.detail.split(":")[1]);
  }
  return result.data;
};

// get package details
const orderItemDetails = async (orderId: string) =>
  await client.get(`${endpoint}/${orderId}/item-order`);

// Food details
const getFoodDetails = async (orderId: string) =>
  await client.get(`${endpoint}/${orderId}/food-order-details`);

// Laundry details
const getLaundryDetails = async (orderId: string) =>
  await client.get(`${endpoint}/${orderId}/laundry-order-details`);

// Pickup order by dispatch/rider
const pickUpOrder = async (order_id: string) => {
  const response = await client.put(`${endpoint}/${order_id}/pick-up-order`);
  if (!response.ok) {
    throw new Error(response.data?.detail?.split(":")[1]);
  }
  return response.data;
};

// Mark order as delivered [dispatch/rider users only]
const orderDelievered = async (order_id: string) => {
  const response = await client.put(
    `${endpoint}/${order_id}/order-is-delivered`
  );
  if (!response.ok) {
    throw new Error(response.data?.detail?.split(":")[1]);
  }
};

// Cancel picked up order [dispatch/rider users only]
const cancelOrder = (order_id: string) =>
  client.put(`${endpoint}/${order_id}/cancel-order`);

// Cancel picked up order [dispatch/rider users only]
const cancelOrderByVendor = (order_id: string) =>
  client.patch(`${endpoint}/${order_id}/vendor-cancel-order`);

// Cancel picked up order [dispatch/rider users only]
const relistOrderByVendor = (order_id: string) =>
  client.patch(`${endpoint}/${order_id}/vendor-relist-order`);

// Mark order as received [vendor users only]
const orderReceived = (order_id: string) =>
  client.put(`${endpoint}/${order_id}/order-received`);

// Mark laundry order as received [by laundry vendor users only]
const laundryOrderReceived = (order_id: string) =>
  client.put(`${endpoint}/${order_id}/laundry-order-received`);

// Restaurant user update food status
const updateItemStatus = async (order_id: string) => {
  const result = await client.patch(
    `${endpoint}/${order_id}/update-item-order-status`
  );

  if (!result.ok) {
    throw new Error(result?.data.detail?.split(":")[1]);
  }
  return result.data;
};

// Order food
const orderFood = async (redtaurantId: string, item: OrderData) => {
  const data = {
    foods: item.items,
    origin: item.origin,
    destination: item.destination,
    distance: item.distance,
    duration: item.duration,
    additional_info: item.additional_info,
    origin_coords: item.originPoints,
    destination_coords: item.destinationPoints,
  };

  const response = await client.post(
    `${endpoint}/${redtaurantId}/order-food`,
    data
  );

  if (!response.ok) {
    throw new Error(response.data?.detail);
  }
  return response.data;
};

const orderLaundry = async (laundryId: string, item: OrderData) => {
  const data = {
    laundries: item.items,
    origin: item.origin,
    destination: item.destination,
    distance: item.distance,
    additional_info: item.additional_info,
  };

  const response = await client.post(
    `${endpoint}/${laundryId}/order-laundry`,
    data
  );

  if (!response.ok) {
    throw new Error(response.data?.detail?.split(":")[0]);
  }
  return response.data;
};

const openDispute = async (orderId: string, order: Dispute) => {
  const data = {
    subject: order.subject,
    content: order.content,
    disputed_user: order.disputedUser,
  };

  const response = await client.post(
    `${endpoint}/${orderId}/open-dispute`,
    data
  );

  if (!response.ok) {
    throw new Error(response?.data?.detail.split(":")[1]);
  }
  return response.data;
};

const getUserDisputes = async () => {
  const response = await client.get(`${endpoint}/user-disputes`);
  if (!response.ok) {
    response.data?.detail || response?.data?.detail.split(":")[1];
  }

  return response?.data;
};

const respondToResponse = async (diputeId: number, content: string) => {
  const data = {
    content,
  };
  const response = await client.post(
    `${endpoint}/${diputeId}/respond-to-dispute`,
    data
  );
  if (!response.ok) {
    response.data?.detail || response?.data?.detail.split(":")[1];
  }

  return response?.data;
};

// Mark order as received [vendor users only]
const closeDispute = (disputeId: number) =>
  client.put(`${endpoint}/${disputeId}/close-dispute`);

// create new order
const createOrder = async (item: CreateOrderType) => {
  const data = new FormData();
  data.append("name", item.name);
  data.append("description", item.description);
  data.append("origin", item.origin);
  data.append("destination", item.destination);
  data.append("duration", item.duration);
  data.append("distance", item.distance!);
  data.append("image", {
    type: "image/jpeg",
    uri: item.orderPhotoUrl,
    name: item.orderPhotoUrl.split("/").slice(-1)[0],
  } as any);

  if (Array.isArray(item.originPoints)) {
    item.originPoints.forEach((coordonate) => {
      data.append("origin_coords", coordonate);
    });
  }

  if (Array.isArray(item.originPoints)) {
    item.destinationPoints.forEach((coordonate) => {
      data.append("destination_coords", coordonate);
    });
  }

  const response = await client.post(`${endpoint}/send-items`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (!response.ok) {
    throw new Error(response.data?.detail);
  }
  return response.data;
};

// Filter order by date range
const filterOrderByDateRange = async (
  start_date: string,
  end_date: string,
  order_type: string
) => {
  const queryParams = new URLSearchParams({
    start_date,
    end_date,
    order_type,
  });
  const response = await client.get(
    `${endpoint}/filter-user-orders-by-date-range?${queryParams.toString()}`
  );

  if (!response.ok) {
    throw new Error(response.data?.detail);
  }
  return response.data;
};

export const getDistance = (
  riderLat: number,
  riderLng: number,
  orderLat: number,
  orderLng: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (orderLat - riderLat) * (Math.PI / 180);
  const dLon = (orderLng - riderLng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(riderLat * (Math.PI / 180)) *
      Math.cos(orderLat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export default {
  getItemOrders,
  getFoodOrders,
  getLaundryOrders,
  orderItemDetails,
  createOrder,
  getUserOrderItems,
  getUserListings,
  pickUpOrder,
  orderDelievered,
  cancelOrder,
  cancelOrderByVendor,
  orderReceived,
  relistOrderByVendor,
  orderFood,
  orderLaundry,
  getFoodDetails,
  getLaundryDetails,
  getUserOrderStats,
  getUserNewFoodOrder,
  getLaundryNewLaundryOrder,
  laundryOrderReceived,
  getUserLaundryOrderItems,
  getUserRestaurantOrderItems,
  updateItemStatus,
  openDispute,
  getUserDisputes,
  respondToResponse,
  filterOrderByDateRange,
  closeDispute,
};
