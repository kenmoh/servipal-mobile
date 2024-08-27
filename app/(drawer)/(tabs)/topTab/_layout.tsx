import { useContext } from "react";
import { StyleSheet } from "react-native";
import { router, Stack, withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ScreenWithFAB from "@/app/ScreenWithFAB";
import FloatingActionButton from "@/components/FloatingActionBtn";

// const TopTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const TopTabLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  const handlePress = () => router.push("sendItem")
  return (
    <ScreenWithFAB onPressFAB={handlePress}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>


    </ScreenWithFAB>
  );
};

export default TopTabLayout;

const styles = StyleSheet.create({});
