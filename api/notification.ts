import client from "./client";

export const registerNotification = (pushToken: string) => {
  client.patch("/users/notification-token", {
    user_notification_token: pushToken,
  });
};
