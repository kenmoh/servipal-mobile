import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { findFocusedRoute } from "@react-navigation/native";
import { SIZES } from "@/constants/Sizes";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

type Transaction = {
    additional_info: string;
    quantity: number;
    total_cost: number;
    payment_status: "pending" | "paid" | "failed";
    status: string;
    transaction_date: string;
};

const TransactionDetail = ({
    isLastItem,
    transaction,
}: {
    isLastItem: boolean;
    transaction: Transaction;
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View
            style={[styles.container, { backgroundColor: activeColor.profileCard }]}
        >
            <Text style={[styles.text, { color: activeColor.text }]}>
                Quantity: {transaction.quantity}
            </Text>
            <Text style={[styles.text, { color: activeColor.text }]}>
                Total Cost: ₦ {transaction.total_cost}
            </Text>
            <Text style={[styles.text, { color: activeColor.text }]}>
                Payment Status:{" "}
                <Text
                    style={[
                        styles.text,
                        { color: transaction.payment_status === "paid" ? "teal" : "crimson" },
                    ]}
                >
                    {transaction.payment_status}
                </Text>
            </Text>
            <Text style={[styles.text, { color: activeColor.text }]}>
                Order Status:{" "}
                <Text
                    style={[
                        styles.text,
                        { color: transaction.status === "paid" ? "teal" : "crimson" },
                    ]}
                >
                    {transaction.status}
                </Text>
            </Text>
            <Text style={[styles.text, { color: activeColor.icon }]}>
                Date: {transaction.transaction_date.split("T")[0]}
            </Text>
        </View>
    );
};

export default TransactionDetail;

const styles = StyleSheet.create({
    container: {
        width: "95%",
        alignSelf: "center",
        marginVertical: 5,
        padding: SIZES.paddingSmall,
        borderRadius: SIZES.smallRadius,
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        marginVertical: 2,
        textTransform: 'capitalize'
    },
});
