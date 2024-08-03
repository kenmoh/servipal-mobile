import { StyleSheet, Text, Image, Dimensions, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Link, router } from 'expo-router'
import { ThemeContext } from '@/context/themeContext'
import { Colors } from '@/constants/Colors'


type CardProps = {
    imageUrl: any
    label: string
    href: string
}

const CARD_HEIGHT = Dimensions.get('screen').height * 0.25
const CARD_WIDTH = Dimensions.get('screen').width * 0.35

const ServiceCard = ({ imageUrl, label, href }: CardProps) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (


        <TouchableOpacity style={[styles.container, { backgroundColor: activeColor.profileCard }]} onPress={() => router.push(href)}>
            <Image source={{ uri: imageUrl }} style={{ height: 100, width: 100 }} resizeMode='center' />
            <Text style={{ color: activeColor.text, fontFamily: 'Poppins-SemiBold', fontSize: 12 }}>{label}</Text>
        </TouchableOpacity>

    )
}

export default ServiceCard

const styles = StyleSheet.create({
    container: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderRadius: 10,
        opacity: 0.65
    }
})