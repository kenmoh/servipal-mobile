import client from "@/api/client";
import {
  CreateDispatch,
  CreateRider,
  CreateUser,
  SetupCompany,
  UpdateProfileImage,
  UpdateUser,
} from "@/utils/types";

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

// Get user reviews
const getUserReviews = async (id: string) =>
  await client.get(`${user}/${id}/user-reviews`);

const createUser = async (user: CreateUser) => {
  const reqData = {
    email: user.email.toLowerCase().trim(),
    username: user.username,
    phone_number: user.phoneNumber,
    password: user.password,
  };

  const result = await client.post(userEndpoint, reqData);
  if (!result.ok) throw new Error(result?.data.detail.split(":")[1]);
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

  if (!result.ok) throw new Error(result?.data.detail.split(":")[1]);
  return result.data;
};

// Vendor add new rider
const vendorAddRider = async (rider: CreateRider) => {
  const riderData = {
    email: rider.email.toLowerCase().trim(),
    phone_number: rider.phoneNumber,
    plate_number: rider.plateNumber,
    full_name: rider.fullName,
    password: rider.password,
  };

  const result = await client.post(riderEndpoint, riderData);

  if (!result.ok) throw new Error(result?.data.detail.split(":")[1]);
  return result.data;
};

// Update user(Dispatch and Vendor)
const updateUser = async (data: UpdateUser) => {
  const userData = {
    full_name: data.fullName,
    bank_account_number: data.bankAccountNumber,
    bank_name: data.bankName,
    account_holder_name: data.accountHolderName,
    company_reg_number: data.companyRegNum,
  };

  const result = await client.patch(`${user}/me/dispatcher`, userData);

  if (!result.ok) throw new Error(result?.data.detail.split(":")[1]);
  return result.data;
};

// Confirm Account
const confirmAccount = async (emailCode: string, phoneCode: string) => {
  const data = {
    email_code: emailCode.trim(),
    phone_code: phoneCode.trim(),
  };

  const result = await client.patch(`${user}/confirm-account`, data);

  if (!result.ok) throw new Error(result?.data.detail.split(":")[1]);
  return result.data;
};

// Update Profile Image
const updateProfileImage = async (img: UpdateProfileImage) => {
  const data = new FormData();

  data.append("image", {
    type: "image/jpeg",
    uri: img.profileImageUrl,
    name: img.profileImageUrl.split("/").slice(-1)[0],
  });

  const response = await client.post(`${user}/update-profile-image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (!response.ok) {
    throw new Error(response?.data.detail.split(":")[1]);
  }
  return response.data;
};

// Update Profile Image
const setupCompanyProfile = async (profile: SetupCompany) => {
  const data = new FormData();
  data.append("location", profile.location);
  data.append("company_name", profile.companyName);
  data.append("opening_hour", profile.openingHour);
  data.append("closing_hour", profile.closingHour);
  data.append("image", {
    type: "image/jpeg",
    uri: profile.image,
    name: profile.image.split("/").slice(-1)[0],
  });
  const response = await client.put(`${user}/setup-company-profile`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.ok) {
    throw new Error(response?.data?.detail);
  }
  return response.data;
};

// Recover Password
const recoverPassword = async (email: string) => {
  const data = {
    email: email,
  };

  const result = await client.post("/password/recover", data);

  if (!result.ok) throw new Error(result?.data.detail.split(":")[1]);
  return result.data;
};

// Fund Wallet
const fundWallet = async ({ amount }: { amount: number }) => {
  const reqData = { amount: amount };

  const result = await client.post("/top-up", reqData);

  if (!result.ok) throw new Error(result?.data.detail.split(":")[1]);
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
  updateProfileImage,
  getUserReviews,
  updateUser,
  setupCompanyProfile,
};
