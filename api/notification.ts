import { ApiResponse } from "apisauce";
import client from "./client";

export const registerNotification1 = (pushToken: string) => {
  client.patch("/users/notification-token", {
    user_notification_token: pushToken,
  });
};

interface NotificationTokenResponse {
  notification_token: string;
}

export const registerNotification = async (
  pushToken: string
): Promise<void> => {
  const currentTokenResponse: ApiResponse<NotificationTokenResponse> =
    await client.get("/users/notification-token");
  const currentToken = currentTokenResponse.data?.notification_token;

  if (currentToken !== pushToken) {
    await client.patch("/users/notification-token", {
      notification_token: pushToken,
    });
  }
};
