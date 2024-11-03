import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { SIZES } from '@/constants/Sizes';
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ItemType } from '@/utils/types';


const IMAGE_HEIGHT = Dimensions.get("screen").height * 0.25;




type ProductCardType = {
    item: ItemType,
    isLastItem: boolean
}

const ProductCard = ({ item, isLastItem }: ProductCardType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const router = useRouter()
    return (
        <View style={[styles.container, { backgroundColor: activeColor.profileCard, marginBottom: isLastItem ? 20 : 10 }]}>

            <Image style={styles.image} source={{ uri: item?.image_urls[0] }} />

            <View style={styles.wrapper}>
                <Text style={[styles.text, { color: activeColor.text }]}>{item?.name}</Text>
                <View style={{ gap: 5, flexDirection: 'row' }}>
                    <Text style={[styles.text, { color: activeColor.text }]}>₦ {item?.price}</Text>
                    <Text style={[styles.text, { color: activeColor.text }]}> Stock: {item?.stock}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 30, alignSelf: 'flex-end', marginBottom: 10, marginEnd: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => router.push({
                    pathname: '(p2p)/addItem', params: {
                        id: item.id.toString(),
                        name: item.name,
                        stock: item.stock,
                        price: item.price,
                        colors: item.colors,
                        sizes: item.sizes,
                        description: item.description,
                        imageUrls: JSON.stringify(item.image_urls)
                    }
                })}>
                    <Feather name='edit' size={24} color={activeColor.icon} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.push('/')}>
                    <Ionicons name='trash' size={24} color={Colors.error} />
                </TouchableOpacity>
            </View>
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