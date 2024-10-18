import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { FoodType } from '@/utils/types'
import { LaundryType } from '@/components/LaundryCard'
import { useLocalSearchParams } from 'expo-router'
import OrderItem from '@/components/orderItem'
import { ThemeContext } from '@/context/themeContext'
import { Colors } from '@/constants/Colors'
import orderApi from '@/api/orders'
import { useQuery } from '@tanstack/react-query'

type OrderItemType = {
    foods: FoodType,
    laundries: LaundryType,
    orderType: 'food' | 'laundry',
    userId: string
}

type ItemType = {
    name: string;
    textColor: string;
    quantity?: string;
    amount: number;

}
const orderItems = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { orderType, orderId } = useLocalSearchParams()

    const { data } = useQuery({
        queryKey: ['orderDetails', orderId],
        queryFn: () => {
            if (orderType === 'food') {
                return orderApi.getFoodDetails(orderId as string)
            } else if (orderType === 'laundry') {
                return orderApi.getLaundryDetails(orderId as string)
            }
        },
        enabled: !!orderId
    })
    console.log(data?.data)
    // Assign items based on orderType
    const items = orderType === 'food' ? data?.data?.foods : data?.data?.laundries;

    console.log(items, '=============')

    return (
        <View style={[styles.container, { backgroundColor: activeColor.background }]}>
            {/* {
                items.map(item => (
                    <OrderItem key={item.name} amount={item.amount} label={item.name} quantity={item.quantity} textColor={activeColor.text} />
                ))
            } */}
        </View>
    )
}

export default orderItems

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})