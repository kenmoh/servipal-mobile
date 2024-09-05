import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, withLayoutContext } from 'expo-router'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const StatTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const StatLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
        </Stack>

    )
}

export default StatLayout

const styles = StyleSheet.create({})