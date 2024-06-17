import { Stack, withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";

const OrderDetailTopTab = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

const OrderDetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="orderMap" options={{ title: "Order MAP SCREEN" }} />
      <Stack.Screen name="index" options={{
        title: "New order",
      }} />
      <Stack.Screen name="payment" options={{
        title: "Make Payment"
      }} />
      <Stack.Screen name="transferDetail" options={{
        title: "Bank Transfer"
      }} />
    </Stack>
  );
};

export default OrderDetailLayout;
