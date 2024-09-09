import client from "@/api/client";

export const payWithWallet = async (orderId: string) => {
  const response = await client.post(`${orderId}/pay-with-wallet`);
  console.log(response.data, "000000000000000000000000");
  if (!response.ok) {
    throw new Error(response?.data?.detail);
  }
  return response.data;
};
