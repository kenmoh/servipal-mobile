import { useContext } from "react";
import { StyleSheet } from "react-native";
import { router, withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ScreenWithFAB from "@/app/ScreenWithFAB";
import FloatingActionButton from "@/components/FloatingActionBtn";

const TopTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const TopTabLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  const handlePress = () => router.push("/sendItem")
  return (
    <ScreenWithFAB onPressFAB={handlePress}>
      <TopTabBar
        screenOptions={{
          tabBarLabelStyle: {
            color: activeColor.tabIconDefault,
            fontSize: 12,
            textTransform: 'capitalize',
            fontFamily: 'Poppins-Bold',
            marginBottom: -20
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


        <TopTabBar.Screen name="index" options={{ title: "Orders", }} />
        <TopTabBar.Screen name="myOrder" options={{ title: "My Orders", }} />
      </TopTabBar>

    </ScreenWithFAB>
  );
};

export default TopTabLayout;

const styles = StyleSheet.create({});
