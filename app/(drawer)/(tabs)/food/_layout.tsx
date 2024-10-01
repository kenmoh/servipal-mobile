import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { router, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useQuery } from "@tanstack/react-query";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ScreenWithFAB from "@/app/ScreenWithFAB";
import { useAuth } from "@/auth/authContext";
import ordersApi from '@/api/orders'


const FoodTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);


const FoodOrderLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { user } = useAuth()

  const { data, refetch, error, isFetching } = useQuery({
    queryKey: ["newFoodOrders"],
    queryFn: ordersApi.getUserNewFoodOrder,
  });



  return (

    <ScreenWithFAB onPressFAB={() => router.push('(restaurant)/addMeal')}>

      <FoodTabBar
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            textAlign: 'center',
            textTransform: 'capitalize',
            fontFamily: 'Poppins-Bold',

          },
          swipeEnabled: user?.user_type === 'Restaurant Service Provider' ? false : true,
          tabBarActiveTintColor: activeColor.text,
          tabBarInactiveTintColor: activeColor.icon,
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
        <FoodTabBar.Screen name="index" options={{ title: "Restaurants" }} />
        <FoodTabBar.Screen name="new" options={{ title: `New Orders(${data?.data !== 'undefined' && data?.data?.length})` }} />

      </FoodTabBar>

    </ScreenWithFAB>

  );
};

export default FoodOrderLayout;

const styles = StyleSheet.create({});
