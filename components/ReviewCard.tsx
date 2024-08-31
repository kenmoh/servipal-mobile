import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { SIZES } from '@/constants/Sizes';
import { ReviewType } from '@/utils/types';

const ReviewCard = ({ review }: { review: ReviewType }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <>
            <View style={[styles.container, { backgroundColor: activeColor.profileCard }]}>
                <View>
                    <Text style={[styles.tittleText, { color: activeColor.text }]}>username</Text>
                    <Text style={[styles.text, { color: activeColor.icon }]}>
                        5{review?.rating}<AntDesign name="staro" color={Colors.btnPrimaryColor} size={8} />
                    </Text>
                </View>
                <Text style={[styles.text, { color: activeColor.icon, marginVertical: 10 }]}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti ex vel non laborum qui ipsum maiores dolore delectus molestias?
                </Text>
                <Text style={[styles.text, { color: activeColor.icon, alignSelf: 'flex-end' }]}>date</Text>
            </View>
        </>
    )
}

export default ReviewCard

const styles = StyleSheet.create({
    tittleText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
    },
    text: {
        fontFamily: 'Poppins-Light',
        fontSize: 12
    },
    container: {
        width: '95%',
        alignSelf: 'center',
        padding: SIZES.paddingSmall,
        borderRadius: SIZES.smallRadius,
        marginVertical: 5
    }
})