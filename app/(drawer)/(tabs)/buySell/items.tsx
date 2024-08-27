import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import SellCard from '@/components/SellCard';

const items = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={[styles.container, { backgroundColor: activeColor.background }]}>

        </View>
    )
}

export default items

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})