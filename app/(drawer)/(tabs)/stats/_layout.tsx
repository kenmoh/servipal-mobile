import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { withLayoutContext } from 'expo-router'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';


const StatTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const StatLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <StatTabBar screenOptions={{
            tabBarLabelStyle: {
                color: activeColor.tabIconDefault,
                fontSize: 12,
                textAlign: 'center',
                textTransform: 'capitalize',
                fontFamily: 'Poppins-Bold',

            },
            tabBarActiveTintColor: activeColor.text,
            tabBarInactiveTintColor: activeColor.icon,
            tabBarAndroidRipple: { borderless: false, color: activeColor.icon },

            tabBarPressColor: "gray",
            tabBarStyle: {
                borderBottomColor: activeColor.borderColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: activeColor.background,
            },
        }}>
            <StatTabBar.Screen name="index" options={{ title: 'Package' }} />
            <StatTabBar.Screen name="food" options={{ title: 'Food' }} />
            <StatTabBar.Screen name="laundry" options={{ title: 'Laundry' }} />

        </StatTabBar>

    )
}

export default StatLayout

const styles = StyleSheet.create({})