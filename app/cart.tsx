import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import CartItem from "@/components/CartItem";
import OrderBtn from "@/components/OrderBtn";
import { useMutation } from "@tanstack/react-query";
import { OrderData, ServerOrderData } from "@/auth/cartContext";
import orderApi from "@/api/orders";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { showMessage } from "react-native-flash-message";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

const ClearCart = ({ onPress }: { onPress: () => void }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: "crimson",
                opacity: 0.8,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 3.5,
                paddingHorizontal: 10,
                borderRadius: 20,
                borderCurve: "continuous",
            }}
        >
            <EvilIcons name="trash" color={"#eee"} size={18} />
            <Text
                style={{
                    color: "#eee",
                    fontFamily: "Poppins-Medium",
                    fontSize: 10,
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


    const { cart, getTotalPrice, clearCart, clearDeliveryInfo, getServerOrderData } = useCart();

    console.log(cart)

    const { mutate: submitOrder, isPending, data } = useMutation({
        mutationFn: (orderData: ServerOrderData) => {
            if (cart.orderType === 'food') {
                return orderApi.orderFood(orderData.items[0].restaurant_id, orderData);
            } else if (cart.orderType === 'laundry') {
                return orderApi.orderLaundry(orderData.items[0].laundry_id, orderData);
            }
            throw new Error('Invalid order type');
        },
        onSuccess: (responseData) => {


            showMessage({
                message: "Order added successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push({
                pathname: "/payment",
                params: {
                    paymentUrl: responseData?.payment_url,
                    orderType: responseData?.order_type,
                    id: responseData?.id,
                    totalCost: responseData?.total_cost,
                    deliveryFee: responseData?.delivery_fee,
                    itemCost: responseData?.item_cost,
                    items: JSON.stringify(responseData?.order_type === 'food' ? responseData?.foods : responseData?.laundries)

                },
            });

            clearCart();
            clearDeliveryInfo()
        },
        onError: (error: Error) => {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.push("/cart");
        }
    });

    const handleSubmitOrder = () => {
        const serverOrderData = getServerOrderData();
        submitOrder(serverOrderData);
    };


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
                {cart.items && cart.items.length > 0 ? (
                    <CartItem />
                ) : (
                    <View
                        style={{
                            marginVertical: Dimensions.get("screen").height / 3.5,
                            alignItems: "center",
                        }}
                    >
                        <AntDesign
                            name="shoppingcart"
                            size={100}
                            color={activeColor.icon}
                        />
                        <Text
                            style={{
                                color: activeColor.text,
                                fontFamily: "Poppins-Medium",
                                fontSize: 13,
                            }}
                        >
                            Your cart is empty!
                        </Text>
                    </View>
                )}
            </ScrollView>
            <View
                style={{
                    width: "100%",
                    padding: 20,
                }}
            >
                {cart.items.length >= 1 && (
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
        paddingHorizontal: 10,
    },
});
