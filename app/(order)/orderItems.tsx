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

    const htmlContent = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: auto;
                        padding-horizontal: 10px;
                        width: 80%;
                        

                    }
                    h1 {
                        color:${activeColor.text};
                        text-align: center;
                        text-transform: capitalize;
                        font-weight: bold;
                    }
                    p {
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    ul {
                        list-style-type: none;
                        padding: 1px;
                    }
                    li {
                        color: #aaa
                        margin: 5px 0;
                        padding: 10px;
                        border-radius: 5px;
                        font-size: 14;
                    }
                    hr {
                        width: 100%;
                        height: 1px;
                        background-color: gold
                        }
                    div{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 2.5px;
                    }
                </style>
            </head>
            <body>
                <h1>Order Details</h1>
                <p>Order #: ${data?.data?.order_number}</p>
                <small>Date: ${data?.data?.created_at.split('T')[0]}</small>
                <div>
                <p>Rider Name: ${data?.data?.rider_name}</p>
                <p>Rider Phone: ${data?.data?.rider_phone_number}</p>
                <p>Bike Plate Number: ${data?.data?.rider_bike_plate_number}</p>
                </div>
                <div>
                <p>Dispatch Company: ${data?.data?.dispatch_company_name}</p>
                <p>Dispatch Company Phone: ${data?.data?.dispatch_company_phone_number}</p>
                </div>
                <div>
                <p>Vendour: ${data?.data?.vendor_username}</p>
                <p>Vendour Phone: ${data?.data?.vendor_phone_number}</p>
                </div>
               
                <hr />
                <hr />
                <ul>
                    ${items?.map(item => `<li style="display: flex; color:#aaa; justify-content: space-between; align-items: center;">
                        
                        <div>${item.quantity} x ${item.name}</div>
                        <div> $${item.price}</div>
                        </li>`).join('')}
                </ul>
            </body>
        </html>
    `;

    const shareReceipt = async () => {
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
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
