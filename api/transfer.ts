import client from "./client";

const transferEndpoint = "/payment";

const transferPaymentDetail = (orderId: string) =>
  client.get(`${transferEndpoint}/${orderId}/transfer-payment`);

export default { transferPaymentDetail };
