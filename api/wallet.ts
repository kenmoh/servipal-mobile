import client from "@/api/client";

const wallet = "/wallets";
const withdraw = "/withdrawals/";

const getUserWallet = async () => await client.get(`${wallet}/user-wallet`);
const withdrawFunds = async () => await client.post(`${withdraw}`);

export default {
  getUserWallet,
  withdrawFunds,
};
