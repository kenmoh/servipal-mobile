import client from "@/api/client";
import { CreateOrderType } from "@/utils/types";

const endpoint = "/orders";

// Get all item orders
const getItemOrders = async () => await client.get(`${endpoint}/item-orders`);

// Get food orders
const getFoodOrders = async () => await client.get(`${endpoint}/food-orders`);

// Get laundry orders
const getLaundryOrders = async () =>
  await client.get(`/${endpoint}/laundry-orders`);

// Get order by Sender
const getVendorListings = async () =>
  await client.get(`${endpoint}/user-item-orders`);

// Get order by Dispatch
const getUserListings = () => client.get(`${endpoint}/user-orders`);

const orderItemDetails = async (orderId: string) =>
  await client.get(`${endpoint}/${orderId}/item-order`);

// Pickup order by dispatch/rider
const pickUpOrder = (order_id: string) =>
  client.put(`${endpoint}/${order_id}/pick-up-order`);

// Mark order as delivered [dispatch/rider users only]
const orderDelievered = (order_id: string) =>
  client.put(`${endpoint}/${order_id}/order-is-delivered`);

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
};
