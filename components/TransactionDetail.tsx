import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { SIZES } from "@/constants/Sizes";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useAuth } from "@/auth/authContext";
import { useMutation } from "@tanstack/react-query";
import { acceptItem, rejectItem } from "@/api/items";
import { showMessage } from "react-native-flash-message";

type StatusType = 'pending' | 'received' | 'delivered' | 'rejected' | 'received-rejected-item';

type Transaction = {
    id: string;
    additional_info: string;
    quantity: string;
    total_cost: string;
    payment_status: 'pending' | 'paid';
    status: StatusType
    transaction_date: string;
    name: string;
    payment_url: string;
    buyer_id: string;
    seller_id: string;
    buyer_username: string;
    buyer_phone_number: string;
    seller_phone_number: string;
    image_url?: string;
};
type LabelType = {
    label: string;
    value: string;
    color: string;
};
const Label = ({ label, value, color }: LabelType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Text style={[styles.text, { color: activeColor.text }]}>{label}</Text>
            <Text style={[styles.text, { color }]}>{value}</Text>
        </View>
    );
};

const TrasactionBtn = ({
    label,
    color,
    onPress,
}: {
    label: string;
    color: string;
    onPress: (id?: string) => void;
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <TouchableOpacity
            style={{
                marginVertical: 5,
                backgroundColor: color,
                width: "60%",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-end",
                paddingVertical: 2.5,
                borderRadius: 25,
                opacity: 0.6

            }}
            activeOpacity={0.6}
            onPress={onPress}
        >
            <Text
                style={{
                    color: activeColor.text,
                    textTransform: "capitalize",
                    fontFamily: "Poppins-Regular",
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
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
    const { user } = useAuth();


    const { isPending, mutate: acceptOrder } = useMutation({
        mutationFn: () => acceptItem(transaction?.id),
        onError: (error: Error) => {
            showMessage({
                type: 'danger',
                message: error.message
            })
        },
        onSuccess: () => {
            showMessage({
                type: 'success',
                message: 'Item accpeted'
            })
            router.back()
        }
    })

    const { isPending: pending, mutate: rejectOrder } = useMutation({
        mutationFn: () => rejectItem(transaction?.id),
        onError: (error: Error) => {
            showMessage({
                type: 'danger',
                message: error.message
            })
        },
        onSuccess: () => {
            showMessage({
                type: 'success',
                message: 'Item Rejected!'
            })
            router.back()
        }
    })

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: activeColor.profileCard,
                    marginBottom: isLastItem ? SIZES.marginLarge : 5,
                },
            ]}
        >
            {isPending || pending && <ActivityIndicator size={25} />}
            <View style={{ flexDirection: "row", gap: 10 }}>
                <Text
                    style={{
                        color: activeColor.text,
                        fontFamily: "Poppins-Regular",
                        marginBottom: SIZES.marginSmall,
                    }}
                >
                    {transaction.quantity} x {transaction.name}:
                </Text>
                <Text
                    style={{
                        color: activeColor.text,
                        fontFamily: "Poppins-Regular",
                        marginBottom: SIZES.marginSmall,
                    }}
                >
                    ₦{transaction.total_cost}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: SIZES.marginSmall,
                }}
            >
                <Image source={{ uri: transaction.image_url }} style={styles.image} />

                <View style={{ flex: 1 }}>
                    <Label
                        label={
                            user?.id === transaction.seller_id
                                ? "Buyer Phone"
                                : "Seller Phone"
                        }
                        value={
                            user?.id === transaction.seller_id
                                ? transaction.buyer_phone_number
                                : transaction.seller_phone_number
                        }
                        color={activeColor.text}
                    />
                    <Label
                        label="Payment Status"
                        value={transaction.payment_status}
                        color={
                            transaction.payment_status === "paid" ? "teal" : Colors.error
                        }
                    />
                    <Label
                        label="Order Status"
                        value={transaction.status}
                        color={transaction.status === "received" ? "teal" : Colors.error}
                    />
                    <Label
                        label="Date"
                        value={transaction.transaction_date.split("T")[0]}
                        color={activeColor.icon}
                    />
                    {transaction.payment_status !== "paid" && (
                        <TrasactionBtn
                            label="Pay"
                            color="teal"
                            onPress={() =>
                                router.push({
                                    pathname: "payment",
                                    params: {
                                        paymentUrl: transaction?.payment_url,
                                        orderType: "delivery",
                                        id: transaction?.id,
                                        totalCost: transaction?.total_cost,
                                    },
                                })
                            }
                        />
                    )}
                    {(transaction.payment_status === "paid" && transaction.status === 'delivered' && user?.id === transaction.buyer_id) && (
                        <TrasactionBtn
                            label="Received"
                            color="teal"
                            onPress={acceptOrder}
                        />
                    )}
                    {(transaction.payment_status === "paid" && transaction.status === 'pending' && user?.id === transaction.seller_id) && (
                        <TrasactionBtn
                            color={Colors.delivered}
                            label="Delivered"
                            onPress={() => console.log('Delivered')}
                        />
                    )}
                    {(transaction.payment_status === "paid" && transaction.status === 'delivered' && user?.id === transaction.buyer_id) && (
                        <TrasactionBtn
                            color={Colors.error}
                            label="Reject"
                            onPress={rejectOrder}
                        />
                    )}
                    {(transaction.payment_status === "paid" && transaction.status === 'pending' && user?.id === transaction.buyer_id) && (
                        <TrasactionBtn
                            color={Colors.error}
                            label="Cancel"
                            onPress={() => console.log('Cancel')}
                        />
                    )}
                    {(transaction.payment_status === "paid" && transaction.status === 'rejected' && user?.id === transaction.seller_id) && (
                        <TrasactionBtn
                            color={Colors.error}
                            label="Item Returned"
                            onPress={() => console.log('Item Returned')}
                        />
                    )}
                </View>
            </View>
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
        overflow: "hidden",
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        marginVertical: 2,
        textTransform: "capitalize",
    },

    image: {
        width: 130,
        height: 120,
        borderRadius: SIZES.marginSmall,
    },
});
