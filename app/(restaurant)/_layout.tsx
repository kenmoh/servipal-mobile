import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { router, Stack } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/auth/authContext";
import ScreenWithFAB from "../ScreenWithFAB";

const AddCategory = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <TouchableOpacity
            onPress={() => router.push("/(restaurant)/addCategory")}
            style={{ flexDirection: "row", alignItems: "center" }}
        >
            <Entypo name="plus" color={activeColor.icon} size={20} />
            <Text
                style={{
                    color: activeColor.text,
                    fontSize: 12,
                    fontFamily: "Poppins-Light",
                    textDecorationLine: "underline",
                }}
            >
                Add Category
            </Text>
        </TouchableOpacity>
    );
};
const RestaurantLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();
    return (
        <ScreenWithFAB
            fabCondition={(user) => user?.user_type === "Restaurant Service Provider"}
            showFAB
            onPressFAB={() => router.push("(restaurant)/addMeal")}
        >
            <Stack
                screenOptions={{
                    contentStyle: { backgroundColor: activeColor.background },
                }}
            >
                <Stack.Screen
                    name="[restaurantId]"
                    options={{
                        title: "",
                        headerShadowVisible: false,
                        headerTitleAlign: "center",
                        headerTintColor: activeColor.text,
                        headerTransparent: true,
                        headerStyle: {
                            // backgroundColor: activeColor.background,
                        },
                    }}
                />

                <Stack.Screen
                    name="addMeal"
                    options={{
                        title: "Add Meal",
                        headerShadowVisible: false,
                        headerTitleAlign: "center",
                        headerTintColor: activeColor.text,
                        headerRight: () => <AddCategory />,
                        headerStyle: {
                            backgroundColor: activeColor.background,
                        },
                    }}
                />
                <Stack.Screen
                    name="addCategory"
                    options={{
                        title: "Add Category",
                        headerShadowVisible: false,
                        headerTitleAlign: "center",
                        headerTintColor: activeColor.text,
                        headerStyle: {
                            backgroundColor: activeColor.background,
                        },
                    }}
                />
                <Stack.Screen
                    name="deliveryInfo"
                    options={{
                        title: "Delivery Information",
                        headerShadowVisible: false,
                        headerTitleAlign: "center",
                        headerTintColor: activeColor.text,
                        headerStyle: {
                            backgroundColor: activeColor.background,
                        },
                    }}
                />

                <Stack.Screen
                    name="payment"
                    options={{
                        title: "Make Payment",
                        headerShadowVisible: false,
                        headerTitleAlign: "center",
                        headerTintColor: activeColor.text,
                        headerStyle: {
                            backgroundColor: activeColor.background,
                        },
                    }}
                />
            </Stack>
        </ScreenWithFAB>
    );
};

export default RestaurantLayout;

const styles = StyleSheet.create({});
