import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { router, Stack } from 'expo-router'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import ScreenWithFAB from '../ScreenWithFAB';
import { useAuth } from '@/auth/authContext';

const LaundryLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()
    return (
        <ScreenWithFAB
            fabCondition={(user) => user?.user_type === "Laundry Service Provider"}
            showFAB
            onPressFAB={() => router.push("(laundry)/addLaundy")}
        >
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
        </ScreenWithFAB>
    )
}

export default LaundryLayout

const styles = StyleSheet.create({})