import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { PaymentStatus } from "@/utils/types";
import CustomBtn from "./CustomBtn";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/Sizes";

[
    {
        amount: "string",
        current_username_or_company_name: "string",
        fund_status: "failed",
        payment_url: "string",
        created_at: "2024-09-01T10:20:38.956Z",
    },
];

type FundCardType = {
    amount: number;
    current_username_or_company_name: string;
    fund_status: PaymentStatus;
    created_at: string;
};

const FundCard = ({
    item,
    isLastItem,
}: {
    item: FundCardType;
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
                    <Text style={[styles.text, { color: activeColor.icon }]}>
                        Username: {item.current_username_or_company_name}
                    </Text>
                    <Text style={[styles.text, { color: activeColor.icon }]}>
                        Amount: {item.amount}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            {
                                color:
                                    item.fund_status === "pending"
                                        ? Colors.delivered
                                        : item.fund_status === "paid"
                                            ? Colors.success
                                            : item.fund_status === "failed"
                                                ? Colors.error
                                                : Colors.error,
                            },
                        ]}
                    >
                        Status: {item.fund_status}
                    </Text>
                </View>
                <Text style={[styles.text, { color: activeColor.icon }]}>
                    {item.created_at.split('T')[0]} {item.created_at.split('T')[1].split('.')[0]}
                </Text>
            </View>
            {/* <TouchableOpacity style={[styles.btn]}>
                <Text style={[styles.text, { color: activeColor.text }]}>Re-Try</Text>
            </TouchableOpacity> */}
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
        fontFamily: "Poppins-Regular",
        fontSize: 12,
    },
});
