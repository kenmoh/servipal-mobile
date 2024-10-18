import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
type OrderItemType = {
    label: string;
    textColor: string;
    quantity?: string;
    amount: number;
};
const OrderItem = ({ quantity, label, amount, textColor }: OrderItemType) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginVertical: 5,
                }}
            >
                {quantity && (
                    <Text style={[styles.text, { color: textColor }]}>
                        {quantity} x {' '}
                    </Text>
                )}
                <Text style={[styles.text, { color: textColor }]}>{label}</Text>
            </View>
            <Text style={[styles.text, { color: textColor }]}>{amount}</Text>
        </View>
    );
}

export default OrderItem

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12
    },
})