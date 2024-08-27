import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';

const LaundryLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: activeColor.background } }}>
            <Stack.Screen name='addLaundry' options={{
                title: 'Add Laundry Item',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: activeColor.text,
                headerStyle: {
                    backgroundColor: activeColor.background,
                }
            }} />

            <Stack.Screen name='laundry' options={{
                title: '',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: activeColor.text,
                headerTransparent: true,

            }} />
        </Stack>
    )
}

export default LaundryLayout

const styles = StyleSheet.create({})