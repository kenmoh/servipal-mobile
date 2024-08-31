import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';
import ReviewCard from '@/components/ReviewCard';

const reviews = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { seller, name } = useLocalSearchParams()
    return (
        <View>
            <ReviewCard />
            <ReviewCard />
            <Text style={{ color: activeColor.text }}>{seller}</Text>
            <Text style={{ color: activeColor.text }}>{name}</Text>
        </View>
    )
}

export default reviews

const styles = StyleSheet.create({})