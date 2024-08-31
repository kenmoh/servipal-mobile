import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';

const BuySellLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: activeColor.background } }}>
            <Stack.Screen name='addItem' options={{
                title: 'Add Item',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: activeColor.text,
                headerStyle: {
                    backgroundColor: activeColor.background,
                }
            }} />
            <Stack.Screen name='reviews' options={{
                title: 'Reviews',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: activeColor.text,
                headerStyle: {
                    backgroundColor: activeColor.background,
                }
            }} />
            <Stack.Screen name='[itemId]' options={{
                title: 'Item Details',
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

export default BuySellLayout

const styles = StyleSheet.create({})