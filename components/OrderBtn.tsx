import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";



type OrderBtnType = {
    totalCost: string;
    onPress: () => void;
};

const OrderBtn = ({ totalCost, onPress }: OrderBtnType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];


    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                styles.container,
                { backgroundColor: Colors.btnPrimaryColor },

            ]}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text style={[styles.text, { color: activeColor.text }]}>
                    Place Order
                </Text>
                <Text style={[styles.text, { color: activeColor.text }]}>
                    ₦ {totalCost}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default OrderBtn;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        bottom: 30,
        paddingVertical: 10,
        borderRadius: 7.5,
        zIndex: 999,
        paddingHorizontal: 35,
    },

    text: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
    },
});
