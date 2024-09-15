import client from "@/api/client";
import { CartState, LaundryOrderData, OrderData } from "@/auth/cartContext";
import { CreateOrderType } from "@/utils/types";

const endpoint = "/orders";

// Get all item orders
const getItemOrders = async () => await client.get(`${endpoint}/item-orders`);

// Get food orders
const getFoodOrders = async () => await client.get(`${endpoint}/food-orders`);

// Get laundry orders
const getLaundryOrders = async () =>
  await client.get(`${endpoint}/laundry-orders`);

// Get order by Sender
const getVendorListings = async () =>
  await client.get(`${endpoint}/user-item-orders`);

// Get vendor new food orders
const getVendorNewFoodOrder = async () =>
  await client.get(`${endpoint}/new-food-orders`);

// Get vendor new laundry orders
const getVendorNewLaundryOrder = async () =>
  await client.get(`${endpoint}/new-ilaundry-orders`);

// Get order by Dispatch
const getUserListings = () => client.get(`${endpoint}/user-orders`);

// Get user order stats
const getUserOrderStats = () => client.get(`${endpoint}/user-order-stats`);

// get package details
const orderItemDetails = async (orderId: string) =>
  await client.get(`${endpoint}/${orderId}/item-order`);

// Food details
const getFoodDetails = async (orderId: string, orderType: string = "food") =>
  await client.get(`${endpoint}/${orderId}/item-food?order_type=${orderType}`);

// Laundry details
const getLaundryDetails = async (
  orderId: string,
  orderType: string = "laundry"
) =>
  await client.get(
    `${endpoint}/${orderId}/item-laundry?order_type=${orderType}`
  );

// Pickup order by dispatch/rider
const pickUpOrder = async (order_id: string) => {
  const response = await client.put(`${endpoint}/${order_id}/pick-up-order`);
  if (!response.ok) {
    throw new Error(response.data?.detail?.split(":")[1]);
  }
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

// Mark laundry order as received [vendor users only]
const laundryOrderReceived = (order_id: string) =>
  client.put(`${endpoint}/${order_id}/laundry-order-received`);

// Order food
const orderFood = async (vendorId: string, item: OrderData) => {
  const data = {
    foods: item.foods,
    origin: item.origin,
    destination: item.destination,
    distance: item.distance,
    additional_info: item.additional_info,
  };

  const response = await client.post(
    `${endpoint}/${vendorId}/order-food`,
    data
  );

  if (!response.ok) {
    throw new Error(response.data?.detail);
  }
  return response.data;
};
const orderLaundry = async (vendorId: string, item: LaundryOrderData) => {
  const data = {
    laundries: item.laundries,
    origin: item.origin,
    destination: item.destination,
    distance: item.distance,
    additional_info: item.additional_info,
  };

  const response = await client.post(
    `${endpoint}/${vendorId}/order-laundry`,
    data
  );

  if (!response.ok) {
    throw new Error(response.data?.detail);
  }
  return response.data;
};

// create new order
const createOrder = async (item: CreateOrderType) => {
  const data = new FormData();
  data.append("name", item.name);
  data.append("description", item.description);
  data.append("origin", item.origin);
  data.append("destination", item.destination);
  data.append("distance", item.distance!);
  data.append("image", {
    type: "image/jpeg",
    uri: item.orderPhotoUrl,
    name: item.orderPhotoUrl.split("/").slice(-1)[0],
  });

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

export default {
  getItemOrders,
  getFoodOrders,
  getLaundryOrders,
  orderItemDetails,
  createOrder,
  getVendorListings,
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
  getVendorNewFoodOrder,
  getVendorNewLaundryOrder,
  laundryOrderReceived,
};
