import client from "@/api/client";
import { CreateLaundry, CreateLaundryResponse } from "@/utils/types";
import { ApiResponse } from "apisauce";

const user = "/users";
const laundry = "/laundry";

export const getLaundryServiceUsers = async () =>
  await client.get(`${user}/get-user-by-laundry_service-provider`);

export const getUserLaundryServices = async (vendorId: string) =>
  await client.get(`${laundry}/${vendorId}/laundry-services`);

// Add Laundry
export const addLaundry = async (
  laundryOtem: CreateLaundry
): Promise<CreateLaundryResponse> => {
  const data = new FormData();
  data.append("name", laundryOtem.name);
  data.append("price", laundryOtem.price);
  data.append("image", {
    type: "image/jpeg",
    uri: laundryOtem.image,
    name: laundryOtem.image.split("/").slice(-1)[0],
  });

  const response: ApiResponse<CreateLaundryResponse> = await client.post(
    `${laundry}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.data?.detail);
  }
  if (!response.data) {
    throw new Error("Response data is undefined");
  }
  return response?.data;
};
