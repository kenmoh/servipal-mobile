import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantMeals } from "@/api/foods";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import FoodCard from "@/components/FoodCard";
import { router, useLocalSearchParams } from "expo-router";
import ViewCartBtn from "@/components/ViewCartBtn";
import { useCart } from "@/components/CartProvider";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";

const RestaurantDetails = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { id, username, companyName, imageUrl } = useLocalSearchParams();
    const { cart, getTotalPrice } = useCart();

    const { data: meals, isFetching, isLoading, error } = useQuery({
        queryKey: ["restaurant", id],
        queryFn: () => getRestaurantMeals(id),
    });

    if (isLoading || isFetching) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: activeColor.background,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ActivityIndicator size={30} color={activeColor.tabIconDefault} />
            </View>
        );
    }
    if (error) {
        <View
            style={{
                flex: 1,
                backgroundColor: activeColor.background,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Something went wrong!</Text>
        </View>;
    }
    if (!meals?.data) {
        <View
            style={{
                flex: 1,
                backgroundColor: activeColor.background,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>No Order yet</Text>
        </View>;
    }


    return (
        <>
            <StatusBar
                translucent
                style={theme.mode === "dark" ? "light" : "dark"}
                backgroundColor={activeColor.background}
            />
            <Image
                source={imageUrl}
                contentFit="cover"
                transition={1000}
                style={styles.image}
            />
            <View
                style={{
                    padding: 10,
                    marginBottom: 10,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: activeColor.borderColor
                }}
            >
                <Text
                    style={{
                        fontFamily: "Poppins-SemiBold",
                        textTransform: "capitalize",
                        color: activeColor.text,
                    }}
                >
                    {username || companyName}
                </Text>
                <Text
                    style={[{ color: activeColor.text, fontFamily: "Poppins-Thin" }]}
                >
                    Address
                </Text>
            </View>
            <View
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={meals?.data}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => <FoodCard meal={item} />}
                />
                {cart.foods?.length >= 1 && (
                    <View style={{ paddingHorizontal: 10 }}>
                        <ViewCartBtn
                            label="View cart"
                            totalItem={cart.foods.length}
                            totalCost={getTotalPrice().toFixed(2)}
                            onPress={() => router.push("(restaurant)/deliveryInfo")}
                        />
                    </View>
                )}
            </View>
        </>
    );
};

export default RestaurantDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        height: Dimensions.get("screen").height * 0.2,
        width: Dimensions.get("screen").width,
        alignSelf: "stretch",
        resizeMode: "cover",
    },
});
