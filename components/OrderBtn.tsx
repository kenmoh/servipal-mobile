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


            ]}
        >
            <Text style={[styles.text, { color: activeColor.text }]}>
                ₦ {totalCost}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: Colors.btnPrimaryColor,
                    paddingVertical: 7,
                    borderRadius: 50,
                    paddingHorizontal: 30,


                }}
            >
                <Text style={[styles.text, { color: activeColor.text }]}>
                    Place Order
                </Text>

            </View>
        </TouchableOpacity>
    );
};

export default OrderBtn;

const styles = StyleSheet.create({
    container: {
        width: "100%",

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',

    },

    text: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
    },
});
