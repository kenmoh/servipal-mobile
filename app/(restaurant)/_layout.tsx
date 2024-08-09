import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/auth/authContext';

const RestaurantLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: activeColor.background } }}>
            <Stack.Screen name='restaurant' options={{
                title: '',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: activeColor.text,
                headerTransparent: true,
                headerStyle: {
                    // backgroundColor: activeColor.background,


                }
            }} />

            <Stack.Screen name='addMeal' options={{
                title: 'Add Meal',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: activeColor.text,
                headerStyle: {
                    backgroundColor: activeColor.background,
                }
            }} />
            <Stack.Screen name='deliveryInfo' options={{
                title: 'Delivery Information',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: activeColor.text,
                headerStyle: {
                    backgroundColor: activeColor.background,

                }
            }} />

            <Stack.Screen name="payment" options={{
                title: 'Make Payment',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: activeColor.text,
                headerStyle: {
                    backgroundColor: activeColor.background,


                }

            }} />
        </Stack>
    )
}

export default RestaurantLayout

const styles = StyleSheet.create({})