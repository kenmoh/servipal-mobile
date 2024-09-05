import { useContext } from "react";
import { StyleSheet } from "react-native";
import { router, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ScreenWithFAB from "@/app/ScreenWithFAB";
import { useAuth } from "@/auth/authContext";

const FoodTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);


const FoodOrderLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { user } = useAuth()
  return (

    <>
      {
        user?.user_type === 'vendor' ? (
          <FoodTabBar
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 12,
                textAlign: 'center',
                textTransform: 'capitalize',
                fontFamily: 'Poppins-Bold',

              },
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
            <FoodTabBar.Screen name="index" options={{ title: "Eatries" }} />
            <FoodTabBar.Screen name="delivery" options={{ title: "New Food Orders" }} />

          </FoodTabBar>
        ) : (
          <FoodTabBar
            screenOptions={{
              tabBarLabelStyle: {
                color: activeColor.tabIconDefault,
                fontSize: 12,
                textAlign: 'center',
                textTransform: 'capitalize',
                fontFamily: 'Poppins-Bold',

                marginBottom: -15,
                marginLeft: -10

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
            {/* <FoodTabBar.Screen name="delivery" options={{ title: "New Food Orders" }} /> */}

          </FoodTabBar>
        )
      }
    </>

  );
};

export default FoodOrderLayout;

const styles = StyleSheet.create({});
