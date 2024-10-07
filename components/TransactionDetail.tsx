import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SIZES } from "@/constants/Sizes";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import CustomBtn from "./CustomBtn";
import { router } from "expo-router";

type Transaction = {
    id: string
    additional_info: string;
    quantity: string;
    total_cost: string;
    payment_status: string;
    status: string;
    transaction_date: string;
    name: string
    payment_url: string
};
type LabelType = {
    label: string
    value: string
    color: string
}
const Label = ({ label, value, color }: LabelType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.text, { color: activeColor.text }]}>
                {label}
            </Text>
            <Text style={[styles.text, { color }]}>
                {value}
            </Text>
        </View>
    )
}
const TransactionDetail = ({
    isLastItem,
    transaction,
    isNew
}: {
    isLastItem: boolean;
    transaction: Transaction;
    isNew: boolean
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View
            style={[styles.container, { backgroundColor: activeColor.profileCard, marginBottom: isLastItem ? SIZES.marginLarge : 5 }]}
        >

            <Label label="Item Name" value={transaction.name} color={activeColor.text} />
            <Label label="Quantity" value={transaction.quantity} color={activeColor.text} />
            <Label label="Total Cost" value={`₦ ${transaction.total_cost}`} color={activeColor.text} />
            {isNew && <>
                <Label label="Payment Status" value={transaction.payment_status} color={transaction.payment_status === 'paid' ? 'teal' : 'crimson'} />
                <Label label="Order Status" value={transaction.status} color={transaction.payment_status === 'paid' ? 'teal' : 'crimson'} />
            </>}
            <Label label="Date" value={transaction.transaction_date.split("T")[0]} color={activeColor.icon} />
            {isNew && transaction.payment_status !== 'paid' && <View style={{ marginVertical: 5 }}>
                <CustomBtn btnColor="teal" label="Pay" onPress={() => router.push({
                    pathname: "payment",
                    params: {
                        paymentUrl: transaction?.payment_url,
                        orderType: 'delivery',
                        id: transaction?.id,
                        totalCost: transaction?.total_cost,
                    },
                })} />
            </View>}
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
