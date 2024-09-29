import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "@/auth/authContext";
import ordersApi from "@/api/orders";
import { SIZES } from "@/constants/Sizes";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const StatTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

interface StatType {
    total_orders: number;
    total_pending_orders: number

}
const StatLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();

    const { data: stat }: UseQueryResult<StatType, Error> = useQuery({
        queryKey: ["stats", user?.id],
        queryFn: ordersApi.getUserOrderStats,
    });

    return (
        <>
            <View style={[styles.statWrapper, { backgroundColor: activeColor.background, borderBottomColor: activeColor.profileCard }]}>
                <View style={[styles.statContainer]}>
                    <Feather name="package" color={activeColor.icon} size={18} />
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        Total Orders: {stat?.total_orders}
                    </Text>
                </View>
                <View style={[styles.statContainer]}>
                    <MaterialIcons name="pending" color={activeColor.icon} size={18} />
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        Pending Orders: {stat?.total_pending_orders}
                    </Text>
                </View>
            </View>
            <StatTabBar
                screenOptions={{
                    tabBarLabelStyle: {
                        color: activeColor.tabIconDefault,
                        fontSize: 12,
                        textAlign: "center",
                        textTransform: "capitalize",
                        fontFamily: "Poppins-Bold",
                    },
                    tabBarActiveTintColor: activeColor.text,
                    tabBarInactiveTintColor: activeColor.icon,
                    tabBarAndroidRipple: { borderless: false, color: activeColor.icon },

                    tabBarPressColor: "gray",
                    swipeEnabled: false,
                    tabBarStyle: {
                        borderBottomColor: activeColor.borderColor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: activeColor.background,
                    },
                }}
            >
                <StatTabBar.Screen name="index" options={{ title: "Package" }} />
                <StatTabBar.Screen name="food" options={{ title: "Food" }} />
                <StatTabBar.Screen name="laundry" options={{ title: "Laundry" }} />
            </StatTabBar>
        </>
    );
};

export default StatLayout;

const styles = StyleSheet.create({
    statContainer: {
        flexDirection: "row",
        gap: 5,
    },
    statWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: SIZES.paddingSmall,
        borderWidth: StyleSheet.hairlineWidth
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
    },
});
