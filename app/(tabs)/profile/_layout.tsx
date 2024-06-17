import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{
      animation: "fade_from_bottom",
      headerShadowVisible: false,
    }}>
      <Stack.Screen
        name="index"
        options={{

          title: "My Account",
          headerShown: false,


        }}
      />
      <Stack.Screen
        name="addRider"
        options={{
          title: "Add Rider",
        }}
      />
      <Stack.Screen
        name="riders"
        options={{

          title: "Riders",
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{

          title: "Change Password",

        }}
      />


    </Stack>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({});
