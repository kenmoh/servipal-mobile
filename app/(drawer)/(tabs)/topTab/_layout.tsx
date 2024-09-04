import { useContext } from "react";
import { StyleSheet } from "react-native";
import { router, Stack, withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ScreenWithFAB from "@/app/ScreenWithFAB";
import FloatingActionButton from "@/components/FloatingActionBtn";
import { useAuth } from "@/auth/authContext";

const HomeTab = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const TopTabLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { user } = useAuth()

  const handlePress = () => router.push("sendItem")

  return (
    <ScreenWithFAB onPressFAB={handlePress}>
      <HomeTab screenOptions={{
        tabBarLabelStyle: {
          color: activeColor.tabIconDefault,
          fontSize: 12,
          textAlign: 'center',
          textTransform: 'capitalize',
          fontFamily: 'Poppins-Bold',

        },
        tabBarActiveTintColor: activeColor.text,
        tabBarInactiveTintColor: activeColor.icon,
        tabBarAndroidRipple: { borderless: false, color: activeColor.icon },

        tabBarPressColor: "gray",
        tabBarStyle: {
          borderBottomColor: activeColor.borderColor,
          borderBottomWidth: StyleSheet.hairlineWidth,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: activeColor.background,
        },
      }}>
        <HomeTab.Screen name="index" options={{ title: 'Package' }} />
        <HomeTab.Screen name="food" options={{ title: 'Food' }} />
        <HomeTab.Screen name="laundry" options={{ title: 'Laundry' }} />

      </HomeTab>


    </ScreenWithFAB>
  );
};

export default TopTabLayout;

const styles = StyleSheet.create({});
