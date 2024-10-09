import { Login } from "@/utils/types";
import client from "./client";
import { ApiResponse } from "apisauce";

interface LoginSuccessResponse {
  access_token: string;
  token_type: string;
}

interface LoginErrorResponse {
  detail: string;
}
const loginApi = async (
  username: string,
  password: string
): Promise<LoginSuccessResponse> => {
  const data = new FormData();
  data.append("username", username.trim());
  data.append("password", password.trim());

  const response: ApiResponse<LoginSuccessResponse | LoginErrorResponse> =
    await client.post("/login", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  if (!response.ok || !response.data || "detail" in response.data) {
    const errorMessage =
      response.data && "detail" in response.data
        ? response.data.detail.split(":")[1]
        : "Something went wrong. Please try again.";
    throw new Error(errorMessage);
  }

  return response.data;
};

export default {
  loginApi,
};
