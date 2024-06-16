import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          animation: "fade_from_bottom",
          title: "My Account",
          headerShown: false,
          headerShadowVisible: false,

        }}
      />
      <Stack.Screen
        name="addRider"
        options={{
          animation: "fade_from_bottom",
          title: "Add Rider",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="riders"
        options={{
          animation: "fade_from_bottom",
          title: "Riders",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          animation: "fade_from_bottom",
          title: "Change Password",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="confirmAccount"
        options={{
          animation: "fade_from_bottom",
          title: "Confirm Account",
          headerShadowVisible: false,
        }}
      />

    </Stack>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({});
