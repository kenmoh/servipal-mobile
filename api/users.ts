import client from "@/api/client";
import { CreateDispatch, CreateRider, CreateUser, Login } from "@/utils/types";

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

const createRider = async (user: CreateRider) => {
  const data = new FormData();
  data.append("email", user.email);
  data.append("username", user.username);
  data.append("full_name", user.fullName);
  data.append("phone_number", user.phoneNumber);
  data.append("password", user.password);
  data.append("plate_number", user.plateNumber);
  data.append("location", user.location);
  data.append("image", {
    type: "image/jpeg",
    uri: user.profileImage,
    name: user.profileImage.split("/").slice(-1)[0],
  });

  const response = await client.post(riderEndpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (!response.ok) {
    throw new Error(response.data?.detail);
  }
  console.log(response.problem, response.status, response.originalError);
  return response.data;
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

export default {
  getDispatchRiders,
  createUser,
  createDispatch,
  confirmAccount,
  recoverPassword,
  createRider,
  dispatchSuspenRider,
};
