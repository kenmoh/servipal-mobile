import { Login } from "@/utils/types";
import client from "./client";

// const loginApi = async (username: string, password: string) => {
//   const data = new FormData();
//   data.append("username", username.trim());
//   data.append("password", password.trim());

//   const response = await client.post("/login", data);
//   console.log("RESPONSE DATA ", response);
//   if (!response.ok) {
//     throw new Error(response.data?.detail || "Login failed");
//   }
//   return response.data;
// };

// const loginUser = async (user: Login) => {
//   const loginData = {
//     username: user.username.toLowerCase().trim(),
//     password: user.password.trim(),
//   };
//   console.log(loginData);
//   const result = await client.post("/login", loginData);

//   console.log("LOGIN DATA: ", result.data);

//   if (!result.ok) throw new Error(result.data.detail);
//   return result.data;
// };

const loginApi = async (username: string, password: string) => {
  const data = new FormData();
  data.append("username", username.trim());
  data.append("password", password.trim());

  const response = await client.post("/login", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.ok) {
    throw new Error(response?.data.detail.split(":")[1]);
  }
  return response.data;
};

export default {
  loginApi,
};
