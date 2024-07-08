import client from "@/api/client";
import { CreateDispatch, CreateRider, CreateUser } from "@/utils/types";

const dispatchEndpoint = "/users/register-dispatch";
const riderEndpoint = "/users/register-rider";
const userEndpoint = "/users/register";
const user = "/users";

// Dispatch get all riders
const getDispatchRiders = async () =>
  await client.get(`${user}/dispatcher-riders`);

// Dispatch user Suspend own rider
const dispatchSuspenRider = async (id: string) =>
  await client.put(`${user}/${id}/suspend-rider`);

const createUser = async (user: CreateUser) => {
  const reqData = {
    email: user.email.toLowerCase().trim(),
    username: user.username,
    phone_number: user.phoneNumber,
    password: user.password,
  };

  const result = await client.post(userEndpoint, reqData);
  if (!result.ok) throw new Error(result.data.detail);
  return result.data;
};

const createDispatch = async (user: CreateDispatch) => {
  const reqData = {
    email: user.email.toLowerCase().trim(),
    company_name: user.companyName,
    company_reg_num: user.companyRegNum,
    phone_number: user.phoneNumber,
    password: user.password,
  };

  const result = await client.post(dispatchEndpoint, reqData);

  if (!result.ok) throw new Error(result.data.detail);
  return result.data;
};
const vendorAddRider = async (rider: CreateRider) => {
  const riderData = {
    email: rider.email.toLowerCase().trim(),
    phone_number: rider.phoneNumber,
    plate_number: rider.plateNumber,
    full_name: rider.fullName,
    location: rider.location,
    password: rider.password,
  };

  const result = await client.post(riderEndpoint, riderData);

  if (!result.ok) throw new Error(result.data.detail);
  return result.data;
};

const confirmAccount = async (emailCode: string, phoneCode: string) => {
  const data = {
    email_code: emailCode.trim(),
    phone_code: phoneCode.trim(),
  };

  const result = await client.patch(`${user}/confirm-account`, data);

  if (!result.ok) throw new Error(result.data.detail);
  return result.data;
};

const recoverPassword = async (email: string) => {
  const data = {
    email: email,
  };

  const result = await client.post("/password/recover", data);

  if (!result.ok) throw new Error(result.data.detail);
  return result.data;
};

const fundWallet = async ({ amount }: { amount: number }) => {
  const reqData = { amount: amount };

  const result = await client.post("/top-up", reqData);

  if (!result.ok) throw new Error(result.data.detail);
  return result.data;
};

export default {
  getDispatchRiders,
  createUser,
  createDispatch,
  confirmAccount,
  recoverPassword,
  dispatchSuspenRider,
  fundWallet,
  vendorAddRider,
};
