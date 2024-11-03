import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { SIZES } from '@/constants/Sizes';
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const IMAGE_HEIGHT = Dimensions.get("screen").height * 0.25;
const imageUrl = 'data:image/jpeg;base64,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'

type ItemType = {
    id: number,
    name: string,
    price: string,
    stock: number,
    image_urls: string[]
}

type ProductCardType = {
    item: ItemType,
    isLastItem: boolean
}

const ProductCard = ({ item, isLastItem }: ProductCardType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const router = useRouter()
    return (
        <View style={[styles.container, { backgroundColor: activeColor.profileCard, marginBottom: isLastItem ? 10 : 5 }]}>

            <Image style={styles.image} source={{ uri: item?.image_urls[0] || imageUrl }} />

            <View style={styles.wrapper}>
                <Text style={[styles.text, { color: activeColor.text }]}>{item?.name}</Text>
                <Text style={[styles.text, { color: activeColor.text }]}>{item?.price}</Text>
                <Text style={[styles.text, { color: activeColor.text }]}>{item?.stock}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} style={styles.btn} onPress={() => router.push('/')}>
                <AntDesign name='edit' size={24} color={activeColor.icon} />
            </TouchableOpacity>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    btn: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'teal',
    },
    container: {
        width: '90%',
        alignSelf: 'center',
        overflow: 'hidden',
        borderRadius: SIZES.marginSmall
    },
    image: {
        width: '100%',
        height: IMAGE_HEIGHT
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZES.paddingSmall
    }
})