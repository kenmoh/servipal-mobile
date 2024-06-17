import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const OrderLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTintColor: activeColor.text,
        headerStyle: {
          backgroundColor: activeColor.background
        }
      }}
    >

    </Stack>
  );
};

export default OrderLayout;

const styles = StyleSheet.create({});
