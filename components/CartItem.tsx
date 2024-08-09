import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";


import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useCart } from "./CartProvider";
// import { Image } from 'expo-image';


const CartItem = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { incrementItem, decrementItem, removeFromCart, cart } = useCart();
    const truncateText = (text: string, maxWords = 10) => {
        const words = text.split(' ');
        if (words.length <= maxWords) {
            return text;
        }
        return words.slice(0, maxWords).join(' ') + '...';
    };
    return (
        <>
            {cart.foods.map((cartItem) => (
                <View
                    key={cartItem.id}
                    style={[
                        styles.container,
                        { backgroundColor: activeColor.profileCard },
                    ]}
                >
                    <View key={cartItem.image_url} style={styles.wrapper}>
                        <View style={styles.foodContainer}>
                            <Image src={cartItem.image_url} style={styles.image} />
                            <View>
                                <Text style={[styles.mealText, { color: activeColor.text }]}>
                                    {truncateText(cartItem.name, 1)}
                                </Text>
                                <Text
                                    style={[
                                        styles.labelText,
                                        { color: activeColor.text, fontSize: 12 },
                                    ]}
                                >
                                    ₦ {cartItem.price}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (cartItem.quantity === 1) {
                                        removeFromCart({ id: cartItem.id })
                                    } else {
                                        decrementItem(cartItem.id)
                                    }
                                }}
                                activeOpacity={0.6}
                                style={[styles.btn, { backgroundColor: Colors.light.icon }]}
                            >
                                <AntDesign name="minus" color={"white"} size={15} />
                            </TouchableOpacity>

                            <Text
                                style={[
                                    styles.labelText,
                                    { color: activeColor.text, fontSize: 12 },
                                ]}
                            >
                                {cartItem.quantity}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => incrementItem(cartItem.id)}
                                style={[
                                    styles.btn,
                                    { backgroundColor: Colors.btnPrimaryColor },
                                ]}
                            >
                                <AntDesign name="plus" color={"white"} size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}

            {
                cart.foods.length > 0 && (
                    <View
                        style={{
                            marginTop: 20,
                            backgroundColor: activeColor.profileCard,
                            padding: 10,
                            borderRadius: 10,

                        }}
                    >
                        <Text
                            style={[
                                styles.labelText,
                                { color: activeColor.text, marginVertical: 5 },
                            ]}
                        >
                            Origin:{" "}
                            <Text style={[styles.text, { color: activeColor.text }]}>
                                {cart.origin}
                            </Text>
                        </Text>
                        <Text
                            style={[
                                styles.labelText,
                                { color: activeColor.text, marginVertical: 5 },
                            ]}
                        >
                            Destination: <Text style={[styles.text, { color: activeColor.text }]}>
                                {cart.destination}
                            </Text>
                        </Text>
                        <Text
                            style={[
                                styles.labelText,
                                { color: activeColor.text, marginVertical: 5 },
                            ]}
                        >
                            Distance: <Text style={[styles.text, { color: activeColor.text }]}>
                                {cart.distance}
                            </Text>
                        </Text>
                        <Text
                            style={[
                                styles.labelText,
                                { color: activeColor.text, marginVertical: 5 },
                            ]}
                        >
                            Additinal Info: <Text style={[styles.text, { color: activeColor.text }]}>
                                {cart.additional_info}
                            </Text>
                        </Text>
                    </View>
                )
            }
        </>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 2.5,
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    labelText: {
        fontFamily: "Poppins-Medium",
        fontSize: 13,
    },
    mealText: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        flexWrap: 'wrap'
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 7.5,
        borderRadius: 5,
        backgroundColor: "blue",
        width: 30,
        height: 30,
    },
    foodContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        width: 90
    },

    image: {
        height: 70,
        width: 70,
        aspectRatio: 4 / 3.5,
        objectFit: "fill",
        borderRadius: 10,
        borderCurve: "continuous",
    },

    text: { fontFamily: "Poppins-Light", fontSize: 13 },
});
