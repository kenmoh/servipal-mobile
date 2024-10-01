import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { TransactionData } from "@/utils/types";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const TransactionCard = ({
    transactions,
    isLastTranx,
}: {
    transactions: TransactionData;
    isLastTranx: boolean;
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <>
            {transactions.status === "pending" ||
                transactions.status === "cancelled" ||
                transactions.status === "failed" ? (
                ""
            ) : (
                <View
                    style={[
                        styles.container,
                        {
                            backgroundColor: activeColor.profileCard,
                            marginBottom: isLastTranx ? 20 : 0,
                        },
                    ]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>

                        {(
                            transactions?.transaction_type === "debit" ||
                            transactions?.transaction_type === "paid with wallet"
                        ) ? (
                            <Feather name="arrow-down-left" size={15} color={Colors.error} />
                        ) : (
                            transactions?.status === "paid" ||
                            transactions.transaction_type === "fund wallet" ||
                            transactions.transaction_type === "credit"
                        ) ? (
                            <Feather name="arrow-up-right" size={15} color={'teal'} />
                        ) : null}

                        <View>
                            <Text style={[styles.text, { color: activeColor.text }]}>
                                {transactions.name}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Poppins-Thin",
                                    fontSize: 12,
                                    color: activeColor.text,
                                }}
                            >
                                {transactions.created_at.split("T")[0]}{" "}
                                {transactions.created_at.split("T")[1].split(".")[0]}
                            </Text>
                        </View>
                    </View>

                    <Text
                        style={[
                            styles.text,
                            {
                                color:
                                    parseInt(transactions.amount) < 1
                                        ? Colors.error
                                        : activeColor.text,
                            },
                        ]}
                    >
                        {transactions.amount}
                    </Text>
                </View>
            )}
        </>
    );
};

export default TransactionCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        opacity: 0.7,
    },
    text: {
        fontFamily: "Poppins-SemiBold",
        textTransform: "capitalize",
        fontSize: 12,
    },
});
