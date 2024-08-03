import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';

type CategoryBtnType = {
    label: string
    isSelected?: boolean
    onPress?: (name?: string) => void
}

const CategoryBtn = ({ label, onPress, isSelected }: CategoryBtnType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <TouchableOpacity onPress={() => { }} style={[styles.container, { backgroundColor: isSelected ? activeColor.profileCard : '' }]}>
            <Text style={{ color: activeColor.text, fontFamily: 'Poppins-SemiBold', fontSize: 12, textTransform: 'capitalize' }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default CategoryBtn

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        maxWidth: 400,
        minWidth: 55,
        padding: 10,
        opacity: 0.5,
        alignItems: 'center',
        marginVertical: 10

    }
})