import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { MealType } from './FoodCard';
import { useCart } from './CartProvider';

const CartItem = ({ item }: { item: MealType }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { incrementItem, decrementItem } = useCart()
    return (
        <>
            <View style={[styles.container]}>
                <View style={{ flex: 2 }}><Text style={[styles.labelText, { color: activeColor.text }]}>{item?.name}</Text></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, flex: 1.5 }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => decrementItem(item.id)} style={[styles.btn, { backgroundColor: activeColor.profileCard }]}>
                        <AntDesign name='minus' color={activeColor.text} size={12} />
                    </TouchableOpacity>
                    <Text style={[styles.labelText, { color: activeColor.text }]}>{item?.quantity}</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => incrementItem(item.id)} style={[styles.btn, { backgroundColor: activeColor.profileCard }]}>
                        <AntDesign name='plus' color={activeColor.text} size={12} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.labelText, { color: activeColor.text, textAlign: 'right' }]}>{item?.price}</Text>
                </View>
            </View>
        </>
    )
}

export default CartItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 20,
        marginVertical: 15
    },
    labelText: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
    },
    btn: {
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7.5,
        borderRadius: 50
    }
})