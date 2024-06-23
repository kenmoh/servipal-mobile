import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

const ProfileLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <Stack screenOptions={{
      animation: "fade_from_bottom",
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: activeColor.background,
      },
      headerTintColor: activeColor.text,
      headerTitleAlign: 'center',
      contentStyle: {
        backgroundColor: activeColor.background
      }

    }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
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
