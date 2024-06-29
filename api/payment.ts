import client from "@/api/client";

export const payWithWallet = async (orderId: string) => {
  return await client.post(`${orderId}/pay-with-wallet`);
};
