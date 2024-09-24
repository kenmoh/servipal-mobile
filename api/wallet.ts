import client from "@/api/client";

const wallet = "/wallets";
const withdraw = "/withdrawals/";

const getUserWallet = async () => {
  const result = await client.get(`${wallet}/user-wallet`);

  if (result.ok) {
    throw new Error(result?.data?.detail.split(":")[0]);
  }
  return result.data;
};

const withdrawFunds = async () => {
  const respose = await client.post(`${withdraw}`);
  if (!respose.ok) throw new Error(respose?.data.detail.split(":")[0]);
  return respose.data;
};
const getUserTopUps = async () => {
  const respose = await client.get(`/top-up`);
  if (!respose.ok) throw new Error(respose?.data.detail.split(":")[0]);
  return respose.data;
};

export default {
  getUserWallet,
  withdrawFunds,
  getUserTopUps,
};
