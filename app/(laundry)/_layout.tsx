import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';

const LaundryLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <Stack>
            <Stack.Screen name='addLaundry' options={{
                title: 'Add Item',
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

export default LaundryLayout

const styles = StyleSheet.create({})