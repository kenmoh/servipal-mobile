import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { router, Stack } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";


const BuySellLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <Stack
            screenOptions={{
                contentStyle: { backgroundColor: activeColor.background },
            }}
        >
            <Stack.Screen
                name="addItem"
                options={{
                    title: "Add Item",
                    headerShadowVisible: false,

                    headerTintColor: activeColor.text,
                    headerStyle: {
                        backgroundColor: activeColor.background,
                    },
                }}
            />
            <Stack.Screen
                name="reviews"
                options={{
                    title: "Reviews",
                    headerShadowVisible: false,

                    headerTintColor: activeColor.text,
                    headerStyle: {
                        backgroundColor: activeColor.background,
                    },
                }}
            />
            <Stack.Screen
                name="buyItem"
                options={{
                    title: "Buy Item",
                    headerShadowVisible: false,

                    headerTintColor: activeColor.text,
                    headerStyle: {
                        backgroundColor: activeColor.background,
                    },
                }}
            />
            <Stack.Screen
                name="[itemId]"
                options={{
                    title: "Item Details",
                    headerShadowVisible: false,
                    headerTintColor: activeColor.text,
                    headerStyle: {
                        backgroundColor: activeColor.background,
                    },
                }}
            />
            <Stack.Screen
                name="reviewForm"
                options={{
                    title: "Add Review",
                    headerShadowVisible: false,

                    headerTintColor: activeColor.text,
                    headerStyle: {
                        backgroundColor: activeColor.background,
                    },
                }}
            />
        </Stack>
    );
};

export default BuySellLayout;

const styles = StyleSheet.create({});
