import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { PaymentStatus, TransactionData } from "@/utils/types";
import CustomBtn from "./CustomBtn";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/Sizes";
import { router } from "expo-router";



const FundCard = ({
    item,
    isLastItem,
}: {
    item: TransactionData;
    isLastItem: boolean;
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: activeColor.profileCard,
                    marginBottom: isLastItem ? 20 : 0,
                },
            ]}
        >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    {/* <Text style={[styles.text, { color: activeColor.icon }]}>
                        Username: {item.name}
                    </Text> */}
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        Amount: ₦{item.amount}
                    </Text>
                    <Text
                        style={[
                            styles.text,

                            {
                                color:
                                    item.status === "pending"
                                        ? Colors.delivered
                                        : item.status === "paid"
                                            ? 'teal'
                                            : item.status === "failed"
                                                ? Colors.error
                                                : Colors.error,
                                textTransform: 'uppercase'
                            },
                        ]}
                    >
                        Status: {item.status}
                    </Text>
                </View>
                <Text style={[styles.text, { color: activeColor.icon }]}>
                    {item.created_at.split('T')[0]} {item.created_at.split('T')[1].split('.')[0]}
                </Text>
            </View>
            {
                item.status === 'pending' && (
                    <TouchableOpacity activeOpacity={0.7} style={[styles.btn]} onPress={() => router.push({
                        pathname: "payment",
                        params: {
                            paymentUrl: item.payment_url,
                            orderType: 'delivery',
                            id: item.id,
                            totalCost: item.amount,
                            paymentType: 'fundWallet'
                        },
                    })}>
                        <Text style={[styles.text, { color: '#fff' }]}>Re-Try</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    );
};

export default FundCard;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "teal",
        maxWidth: 65,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 50,
        borderCurve: "continuous",
        marginTop: SIZES.marginSmall,
    },
    container: {
        width: "95%",
        alignSelf: "center",
        padding: SIZES.paddingSmall,
        borderRadius: SIZES.smallRadius,
        marginVertical: 5,
    },
    text: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
    },
});
