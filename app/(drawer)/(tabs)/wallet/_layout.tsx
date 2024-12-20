import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Stack } from 'expo-router'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';


const WalletLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <Stack screenOptions={{
            contentStyle: {
                backgroundColor: activeColor.background
            }
        }}>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='fundWallet' options={{ headerShown: false }} />
            <Stack.Screen name='deposit' options={{ headerShown: false }} />
            <Stack.Screen name='failedTranx' options={{

                headerShadowVisible: false,
                title: 'Top-up Transactions',
                headerTintColor: activeColor.text,
                presentation: 'modal',
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: activeColor.background,
                }
            }} />
        </Stack>
    )
}

export default WalletLayout

const styles = StyleSheet.create({})