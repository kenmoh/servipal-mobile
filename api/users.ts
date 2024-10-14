import client from "@/api/client";
import { ProfileReturnType, ProfileType } from "@/app/setupCompanyProfile";
import {
  companyImage,
  CreateDispatch,
  CreateRider,
  CreateUser,
  ReviewType,
  SetupCompany,
  UpdateProfileImage,
  UpdateUser,
  UserProfile,
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

// Get company profile
const getCompanyProfile = async (): Promise<ProfileReturnType> => {
  const result = await client.get(`${user}/company-profile`);
  if (!result.data) throw new Error(result?.data?.detail.split(":")[1]);
  return result.data;
};

// Get current vendor
const getCurrentVendorUser = async (userId: string) => {
  const result = await client.get(`${user}/${userId}/get-current-vendor-user`);
  if (!result.data) throw new Error(result?.data?.detail.split(":")[1]);
  return result.data;
};

// Get user reviews
const getUserReviews = async (id: string) =>
  await client.get(`${user}/${id}/user-reviews`);

const createUser = async (user: CreateUser) => {
  const reqData = {
    email: user.email.toLowerCase().trim(),
    username: user.username,
    user_type: user.userRole,
    phone_number: user.phoneNumber,
    password: user.password,
  };

  const result = await client.post(userEndpoint, reqData);
  if (!result.ok) throw new Error(result?.data?.detail?.split(":")[1]);
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

  if (!result.ok) throw new Error(result?.data.detail);
  return result.data;
};

// create user profile
const createUserProfile = async (data: UserProfile) => {
  const userData = {
    location: data.location,
    bank_account_number: data.bankAccountNumber,
    bank_name: data.bankName,
    account_holder_name: data.accountHolderName,
  };

  const result = await client.post(`${user}/create-user-profile`, userData);

  if (!result.ok) throw new Error(result?.data.detail.split(":")[1]);
  return result.data;
};

// update user profile
const updateUserProfile = async (data: UserProfile) => {
  const userData = {
    location: data.location,
    bank_account_number: data.bankAccountNumber,
    bank_name: data.bankName,
    account_holder_name: data.accountHolderName,
  };

  const result = await client.patch(`${user}/update-user-profile`, userData);

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

  if (!result.ok) throw new Error(result?.data.detail);
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

// Create company profile
const setupCompanyProfile = async (profile: SetupCompany) => {
  const data = {
    location: profile.location,
    company_name: profile.companyName,
    company_reg_number: profile.companyRegNum,
    opening_hour: profile.openingHour,
    closing_hour: profile.closingHour,
    account_holder_name: profile.accountHolderName,
    bank_name: profile.bankName,
    bank_account_number: profile.accountNumber,
  };

  const response = await client.post(`${user}/setup-company-profile`, data);

  if (!response.ok) {
    throw new Error(response?.data?.detail);
  }
  return response.data;
};

// Update company profile
const updateCompanyProfile = async (profile: SetupCompany) => {
  const data = {
    location: profile.location,
    company_name: profile.companyName,
    company_reg_number: profile.companyRegNum,
    opening_hour: profile.openingHour,
    closing_hour: profile.closingHour,
    account_holder_name: profile.accountHolderName,
    bank_name: profile.bankName,
    bank_account_number: profile.accountNumber,
  };

  const response = await client.patch(`${user}/update-company-profile`, data);

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

// Update Profile Image
const companyProfileImage = async (img: companyImage) => {
  const data = new FormData();

  data.append("image", {
    type: "image/jpeg",
    uri: img.image,
    name: img.image.split("/").slice(-1)[0],
  });

  const response = await client.patch(
    `${user}/update-company-background-image`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // if (!response.ok) {
  //   throw new Error(response?.data?.detail.split(":")[1]);
  // }
  return response.data;
};

type RatingType = {
  rating: string;
  comment: string;
};
// Confirm Account
const addReview = async (orderId: string, reviewData: RatingType) => {
  const data = {
    rating: reviewData.rating,
    comment: reviewData.comment,
  };

  const result = await client.post(`${user}/${orderId}/add-review`, data);

  if (!result.ok) throw new Error(result?.data?.detail.split(":")[0]);
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
  setupCompanyProfile,
  getCompanyProfile,
  createUserProfile,
  updateUserProfile,
  updateCompanyProfile,
  companyProfileImage,
  getCurrentVendorUser,
  addReview,
};
