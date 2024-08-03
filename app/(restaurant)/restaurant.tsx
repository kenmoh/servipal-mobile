import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantMeals } from "@/api/foods";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import FoodCard from "@/components/FoodCard";
import { router, Stack, useLocalSearchParams } from "expo-router";
import ViewCartBtn from "@/components/ViewCartBtn";
import { useCart } from "@/components/CartProvider";

const RestaurantDetails = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { id, username, companyName } = useLocalSearchParams();
    const { cart, getTotalPrice } = useCart();

    const { data: meals } = useQuery({
        queryKey: ["restaurant", id],
        queryFn: () => getRestaurantMeals(id),
    });


    return (
        <>
            <Stack.Screen options={{ title: username || companyName }} />
            <View
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >
                <Text style={[{ color: activeColor.text }]}>RestaurantDetail</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={meals?.data}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => <FoodCard meal={item} />}
                />
                {cart.foods.length > 0 && (
                    <ViewCartBtn
                        label="View cart"
                        totalItem={cart.foods.length}
                        totalCost={getTotalPrice().toFixed(2)}
                        onPress={() => router.push('(restaurant)/deliveryInfo')}
                    />
                )}
            </View>
        </>
    );
};

export default RestaurantDetails;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
});
