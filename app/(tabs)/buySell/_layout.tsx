import { useContext } from "react";
import { StyleSheet } from "react-native";
import { withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const ItemTopTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const ItemTabLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <ItemTopTabBar
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
            <ItemTopTabBar.Screen name="index" options={{ title: "Buy/Sell" }} />
            <ItemTopTabBar.Screen name="items" options={{ title: "Transactions" }} />

        </ItemTopTabBar>
    );
};

export default ItemTabLayout;

const styles = StyleSheet.create({});
