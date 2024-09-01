import client from "@/api/client";

const wallet = "/wallets";
const withdraw = "/withdrawals/";

const getUserWallet = async () => await client.get(`${wallet}/user-wallet`);
const withdrawFunds = async () => {
  const respose = await client.post(`${withdraw}`);
  if (!respose.ok) throw new Error(respose?.data.detail);
  return respose.data;
};

export default {
  getUserWallet,
  withdrawFunds,
};
