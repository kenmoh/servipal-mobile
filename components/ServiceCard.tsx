import { StyleSheet, Text, ImageBackground, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { Link } from 'expo-router'
import { ThemeContext } from '@/context/themeContext'
import { Colors } from '@/constants/Colors'


type CardProps = {
    imageUrl: any
    lable: string
    href: string
}

const CARD_HEIGHT = Dimensions.get('screen').height * 0.25
const CARD_WIDTH = Dimensions.get('screen').height * 0.35

const ServiceCard = ({ imageUrl, lable, href }: CardProps) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <Link href={href} asChild>
            <ImageBackground source={imageUrl} style={styles.container} resizeMode='cover'>
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: activeColor.text }}>{lable}</Text>
            </ImageBackground>
        </Link>
    )
}

export default ServiceCard

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        objectFit: 'contain',
        maxHeight: CARD_HEIGHT,
        maxWidth: CARD_WIDTH
    }
})