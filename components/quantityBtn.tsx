import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';


type QuantityBtnProp = {
    inCreament: () => void
    deCreament: () => void
    quantity: number

}

const QuantityBtn = ({ inCreament, deCreament, quantity }: QuantityBtnProp) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={{ flexDirection: 'row', gap: 5 }}>
            <AntDesign name='minus' color={activeColor.icon} onPress={deCreament} style={{ height: 20 }} />
            {quantity}
            <AntDesign name='plus' color={activeColor.icon} onPress={inCreament} style={{ height: 20 }} />
        </View>


    )
}

export default QuantityBtn

const styles = StyleSheet.create({})