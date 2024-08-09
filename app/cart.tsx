import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import CartItem from "@/components/CartItem";
import OrderBtn from "@/components/OrderBtn";
import { useMutation } from "@tanstack/react-query";
import { OrderData } from "@/auth/cartContext";
import orderApi from "@/api/orders";
import { router, Stack } from "expo-router";
import { showMessage } from "react-native-flash-message";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

const ClearCart = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: Colors.error,
                opacity: 0.3,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 3.5,
                paddingHorizontal: 10,
                borderRadius: 20,
                borderCurve: 'continuous'
            }}
        >
            <EvilIcons name="trash" color={'#eee'} size={24} />
            <Text
                style={{
                    color: '#eee',
                    fontFamily: "Poppins-Medium",
                    fontSize: 15,
                }}
            >
                Clear Cart
            </Text>
        </TouchableOpacity>
    );
};

const Cart = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { cart, getTotalPrice, clearCart, clearDeliveryInfo } = useCart();
    const { mutate, data, error, isSuccess, isPending } = useMutation({
        mutationFn: (orderData: OrderData) =>
            orderApi.orderFood(orderData.foods[0].vendor_id, orderData),
    });

    console.log(cart)

    const handleSubmitOrder = () => {
        mutate(cart);
        if (isSuccess) {
            clearCart();
            clearDeliveryInfo();
        }
    };
    useEffect(() => {
        if (error) {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.push("/cart");
        }
        if (isSuccess) {
            showMessage({
                message: "Order added successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push({
                pathname: "/(restaurant)/payment",
                params: {
                    paymentUrl: data?.payment_url,
                    id: data?.id,
                    totalCost: data?.total_cost,
                    deliveryFee: data?.delivery_fee,
                    foodCost: data?.food_cost,
                    foods: JSON.stringify(data?.foods),
                },
            });
        }
    }, [isSuccess, error]);

    return (
        <>
            <Stack.Screen
                options={{
                    headerRight: () => <ClearCart onPress={clearCart} />,
                }}
            />
            <CustomActivityIndicator visible={isPending} />
            <ScrollView
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >
                <CartItem />
            </ScrollView>
            <View
                style={{
                    width: "100%",
                    padding: 20,
                }}
            >
                {cart.foods.length >= 1 && (
                    <OrderBtn
                        totalCost={getTotalPrice().toFixed(2)}
                        onPress={handleSubmitOrder}
                    />
                )}
            </View>
        </>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
