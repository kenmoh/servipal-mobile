import { useContext } from "react";
import { StyleSheet } from "react-native";
import { router, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ScreenWithFAB from "@/app/ScreenWithFAB";

const FoodTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);
const handlePress = () => router.push("/sendItem")

const FoodOrderLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <ScreenWithFAB onPressFAB={handlePress}>
      <FoodTabBar
        screenOptions={{
          tabBarLabelStyle: {
            color: activeColor.icon,
            fontSize: 12,
            textTransform: 'capitalize',
            fontFamily: 'Poppins-Bold',
            marginBottom: -20, marginLeft: -5
          },
          tabBarAndroidRipple: { borderless: false },
          tabBarPressColor: "gray",
          tabBarStyle: {
            borderBottomColor: activeColor.borderColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: activeColor.background,
          },

        }}
      >
        <FoodTabBar.Screen name="index" options={{ title: "Eatries" }} />
        <FoodTabBar.Screen name="delivery" options={{ title: "Pickup" }} />
        <FoodTabBar.Screen name="foodOrders" options={{ title: "Pending" }} />
        <FoodTabBar.Screen name="completed" options={{ title: "completed" }} />
      </FoodTabBar>
    </ScreenWithFAB>
  );
};

export default FoodOrderLayout;

const styles = StyleSheet.create({});
