import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Transaction } from "@/utils/types";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";


const TransactionCard = ({
    transaction,
    isLastTranx,
}: {
    transaction: Transaction;
    isLastTranx: boolean;
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <>
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
                    {parseInt(transaction.amount) < 0 ? (
                        <Feather name="arrow-up-right" size={15} color={Colors.error} />
                    ) : (
                        <Feather name="arrow-down-left" size={15} color={"green"} />
                    )}
                    <View>
                        <Text style={[styles.text, { color: activeColor.text }]}>
                            {transaction.username}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Poppins-Thin",
                                fontSize: 12,
                                color: activeColor.text,
                            }}
                        >
                            {transaction.created_at.split("T")[0]} {" "}
                            {transaction.created_at.split("T")[1].split('.')[0]}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.text, { color: activeColor.text }]}>
                    {transaction.amount}
                </Text>
            </View>
        </>
    );
};

export default TransactionCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2.5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    text: {
        fontFamily: "Poppins-SemiBold",
        textTransform: "capitalize",
        fontSize: 12,
    },
});
