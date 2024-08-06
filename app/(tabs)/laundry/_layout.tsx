import { useContext } from "react";
import { StyleSheet } from "react-native";
import { withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const LaundryTopTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const LaundryTabLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <LaundryTopTabBar
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
            <LaundryTopTabBar.Screen name="index" options={{ title: "Orders" }} />
            <LaundryTopTabBar.Screen name="orders" options={{ title: "My Orders" }} />

        </LaundryTopTabBar>
    );
};

export default LaundryTabLayout;

const styles = StyleSheet.create({});
