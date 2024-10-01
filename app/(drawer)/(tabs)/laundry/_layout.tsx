import { useContext } from "react";
import { StyleSheet } from "react-native";
import { router, withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ScreenWithFAB from "@/app/ScreenWithFAB";

const LaundryTopTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const LaundryTabLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <ScreenWithFAB
            fabCondition={(user) => user?.user_type === "Laundry Service Provider"}
            showFAB
            onPressFAB={() => router.push("(laundry)/addLaundry")}
        >
            <LaundryTopTabBar
                screenOptions={{
                    tabBarLabelStyle: {
                        // color: activeColor.tabIconDefault,
                        fontSize: 12,
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        fontFamily: 'Poppins-Bold'

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
                <LaundryTopTabBar.Screen name="index" options={{ title: "Orders" }} />
                <LaundryTopTabBar.Screen name="orders" options={{ title: "New Order(s)" }} />

            </LaundryTopTabBar>
        </ScreenWithFAB>
    );
};

export default LaundryTabLayout;

const styles = StyleSheet.create({});
