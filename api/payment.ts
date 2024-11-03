import client from "@/api/client";

type PaymentResponseType = {
  status: string;
  message: string;
  detail: string;
};

export const payWithWallet = async (
  orderId: string
): Promise<PaymentResponseType> => {
  const response = await client.post(`${orderId}/pay-with-wallet`);
  if (!response.ok) {
    console.log(response.data, "jhdhdhdddddddddddddddddddd");
    throw new Error(
      (response.data as { message?: string })?.message ||
        (response.data as { detail?: string })?.detail
    );
  }
  return response.data as PaymentResponseType;
};
