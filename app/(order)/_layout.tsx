import { Stack, withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

const OrderDetailTopTab = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

const OrderDetailLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: activeColor.background,
        },
        headerTintColor: activeColor.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="orderMap" options={{ title: "Order MAP SCREEN" }} />
      <Stack.Screen
        name="createOrder"
        options={{
          title: "New order",
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          title: "Make Payment",
        }}
      />
      <Stack.Screen
        name="transferDetail"
        options={{
          title: "Bank Transfer",
        }}
      />
      <Stack.Screen
        name="paymentFailed"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="paymentSuccess"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
};

export default OrderDetailLayout;
