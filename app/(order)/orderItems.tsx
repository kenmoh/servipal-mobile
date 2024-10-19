import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { FoodType } from "@/utils/types";
import { LaundryType } from "@/components/LaundryCard";
import OrderItem from "@/components/orderItem";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import orderApi from "@/api/orders";
import { useQuery } from "@tanstack/react-query";
import { SIZES } from "@/constants/Sizes";
import { Label } from "../payment";
import { AntDesign, Feather } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";


type OrderItemType = {
    foods: FoodType;
    laundries: LaundryType;
    orderType: "food" | "laundry";
    userId: string;
};

type ItemType = {
    name: string;
    textColor: string;
    quantity?: string;
    amount: number;
};
const orderItems = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { orderType, orderId } = useLocalSearchParams();

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["orderDetails", orderId],
        queryFn: () => {
            if (orderType === "food") {
                return orderApi.getFoodDetails(orderId as string);
            } else if (orderType === "laundry") {
                return orderApi.getLaundryDetails(orderId as string);
            }
        },
        enabled: !!orderId,
    });

    // Assign items based on orderType
    const items =
        orderType === "food" ? data?.data?.foods : data?.data?.laundries;


    const html = `
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Receipt</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 20px;
            color: #333;
        }
    </style>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: ${Colors.btnPrimaryColor}; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Payment Receipt</h1>
        </div>
        <div style="padding: 20px;">
            <div style="border-bottom: 1px solid #e0e0e0; padding-bottom: 15px; margin-bottom: 15px;">
                <h2 style="margin: 0 0 10px; font-size: 18px; color: ${Colors.btnPrimaryColor};">Thank You for Your Payment!</h2>
                <p style="margin: 0; color: #666; font-size: 14px;">Your transaction was successful.</p>
            </div>
            <div style="margin-bottom: 20px; border-bottom: 1px solid #e0e0e0">
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Date: <span style="float: right; color: #333;">${data?.data?.created_at.split('T')[0]}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Order ID: <span style="float: right; color: #333;">#${data?.data?.order_number}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Rider Name: <span style="float: right; color: #333;">${data?.data?.rider_name}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Rider Phone Number: <span style="float: right; color: #333;">#${data?.data?.rider_phone_number}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Bike Number: <span style="float: right; color: #333;">#${data?.data?.rider_bike_plate_number}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Dispatch Company Name: <span style="float: right; color: #333;">#${data?.data?.dispatch_company_name}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Dispatch Company Phone: <span style="float: right; color: #333;">#${data?.data?.dispatch_company_phone_number}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Vendour: <span style="float: right; color: #333;">#${data?.data?.vendor_username}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Vendour Phone: <span style="float: right; color: #333;">#${data?.data?.vendor_phone_number}</span></p>
            </div>
            <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px; font-size: 16px; color: #333;">Item Details</h3>
                ${items?.map(item => `<p style="margin: 0 0 5px; font-size: 14px; color: #666; border-bottom: 1px solid #e0e0e0">${item.quantity} x ${item.name}: <span style="float: right; color: #333;">${item.price}</span></p>`).join('')}
                
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Delivery Fee: <span style="float: right; color: #333;">${data?.data?.delivery_fee}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; color: #666;">${data?.data?.order_type === 'food' ? 'Food Cost' : 'Laundry Cost'}: <span style="float: right; color: #333;">${data?.data?.item_cost}</span></p>
                <p style="margin: 0 0 5px; font-size: 14px; border-top: 1px solid #e0e0e0; color: #666;">Total: <span style="float: right; color: #333; font-weight: 600;">${data?.data?.total_cost}</span></p>
            </div>
        </div>
    </div>
</body>
</html>
    `


    const shareReceipt = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };


    return (
        <ScrollView
            style={[styles.container, { backgroundColor: activeColor.background }]}
        >
            <View style={{ marginVertical: SIZES.marginLarge }} />

            {items?.map(item => (

                <OrderItem
                    key={item.name}
                    amount={item.price}
                    label={item.name}
                    quantity={item.quantity}
                    textColor={activeColor.text}
                />

            ))}
            <View style={[styles.separator, { backgroundColor: activeColor.profileCard }]} />
            <Label textColor={activeColor.icon} label="Delivery Feee" amount={data?.data?.delivery_fee} />
            <View style={[styles.separator, { backgroundColor: activeColor.profileCard }]} />
            <Label textColor={activeColor.icon} label={data?.data?.order_type === 'food' ? 'Food Cost' : 'Laundry Cost'} amount={data?.data?.item_cost} />
            <View style={[styles.separator, { backgroundColor: activeColor.profileCard }]} />
            <Label textColor={activeColor.text} label="Total" amount={data?.data?.total_cost} />
            <View style={[styles.separator, { backgroundColor: activeColor.profileCard }]} />

            {
                data?.data?.order_status !== 'pending' && <TouchableOpacity hitSlop={25} onPress={shareReceipt} style={{ marginVertical: SIZES.marginLarge, alignSelf: 'center', gap: 20, flexDirection: 'row' }}>
                    <AntDesign name="sharealt" color={activeColor.icon} size={25} />
                </TouchableOpacity>}

            {isFetching && <ActivityIndicator size={25} color={activeColor.icon} style={{ alignSelf: 'center', justifyContent: 'center' }} />}
        </ScrollView>
    );
};

export default orderItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.paddingMedium,
    },
    separator: { width: '100%', height: StyleSheet.hairlineWidth, marginVertical: 5 }
});
