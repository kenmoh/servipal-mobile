import { useContext } from "react";
import { StyleSheet } from "react-native";
import { router, withLayoutContext } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ScreenWithFAB from "@/app/ScreenWithFAB";
import ordersApi from '@/api/orders'

const LaundryTopTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const LaundryTabLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { data, isFetching } = useQuery({
        queryKey: ["newFoodOrders"],
        queryFn: ordersApi.getLaundryNewLaundryOrder,
    });
    return (
        <ScreenWithFAB
            fabCondition={(user) => user?.user_type === "Laundry Service Provider"}
            showFAB
            onPressFAB={() => router.push("(laundry)/addLaundry")}
        >
            <LaundryTopTabBar
                screenOptions={{
                    tabBarLabelStyle: {
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
                <LaundryTopTabBar.Screen name="index" options={{ title: "Laundry" }} />
                <LaundryTopTabBar.Screen name="orders" options={{ title: `New(${isFetching ? 0 : data?.data?.length})` }} />

            </LaundryTopTabBar>
        </ScreenWithFAB>
    );
};

export default LaundryTabLayout;

const styles = StyleSheet.create({});
