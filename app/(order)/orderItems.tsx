import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { FoodType } from '@/utils/types'
import { LaundryType } from '@/components/LaundryCard'
import { useLocalSearchParams } from 'expo-router'
import OrderItem from '@/components/orderItem'
import { ThemeContext } from '@/context/themeContext'
import { Colors } from '@/constants/Colors'

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
    const { foods, laundries, orderType, userId } = useLocalSearchParams()
    const items: ItemType[] = orderType === 'food' ? foods : laundries
    return (
        <View style={[styles.container, { backgroundColor: activeColor.background }]}>
            {
                items.map(item => (
                    <OrderItem key={item.name} amount={item.amount} label={item.name} quantity={item.quantity} textColor={activeColor.text} />
                ))
            }
        </View>
    )
}

export default orderItems

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})