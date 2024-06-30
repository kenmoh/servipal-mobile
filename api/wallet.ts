import client from "@/api/client";

const wallet = "/wallets";

const getUserWallet = async () => await client.get(`${wallet}/user-wallet`);

export default {
  getUserWallet,
};
