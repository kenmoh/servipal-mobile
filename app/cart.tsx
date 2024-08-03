import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import CartItem from "@/components/CartItem";
import OrderBtn from "@/components/OrderBtn";
import { useMutation } from "@tanstack/react-query";
import { CartState, OrderData } from "@/auth/cartContext";
import orderApi from "@/api/orders";
import { router } from "expo-router";

const Cart = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { cart, getTotalPrice } = useCart();
    const { mutate, data } = useMutation({
        mutationFn: (orderData: OrderData) => orderApi.orderFood(orderData.foods[0].vendor_id, orderData)
    })

    const handleSubmitOrder = () => {
        mutate(cart)
    }
    console.log(data)


    return (
        <View
            style={[styles.container, { backgroundColor: activeColor.background }]}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={cart.foods}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }) => <CartItem item={item} />}
            />
            <OrderBtn
                totalCost={getTotalPrice().toFixed(2)}
                onPress={handleSubmitOrder}
            />
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
