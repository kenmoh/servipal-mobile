import { useContext } from "react";
import { StyleSheet } from "react-native";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const FoodTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const FoodOrderLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <FoodTabBar
      screenOptions={{
        tabBarLabelStyle: {
          color: activeColor.tabIconDefault,
        },
        tabBarAndroidRipple: { borderless: false },
        tabBarPressColor: "gray",
        tabBarStyle: {
          borderBottomColor: activeColor.borderolor,
          borderBottomWidth: StyleSheet.hairlineWidth,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: activeColor.background,
        },
      }}
    >
      <FoodTabBar.Screen name="index" options={{ title: "Restaurants" }} />
      <FoodTabBar.Screen name="foodOrders" options={{ title: "Food Orders" }} />


    </FoodTabBar>
  );
};

export default FoodOrderLayout;

const styles = StyleSheet.create({});
