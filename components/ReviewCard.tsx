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
                    <Text style={[styles.tittleText, { color: activeColor.text }]}>{review.name}</Text>
                    <Text style={[styles.text, { color: activeColor.icon }]}>
                        {review?.rating} {" "}<AntDesign name="staro" color={Colors.btnPrimaryColor} size={12} />
                    </Text>
                </View>
                <Text style={[styles.text, { color: activeColor.icon, marginVertical: 10 }]}>
                    {review.comment}
                </Text>
                <Text style={[styles.text, { fontSize: 10, color: activeColor.icon, alignSelf: 'flex-end', fontFamily: 'Poppins-Light' }]}>{review.created_at.split('T')[0]}</Text>
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
        fontFamily: 'Poppins-Regular',
        fontSize: 14
    },
    container: {
        width: '95%',
        alignSelf: 'center',
        paddingVertical: SIZES.paddingSmall,
        paddingHorizontal: SIZES.paddingLarge,
        borderRadius: SIZES.smallRadius,
        marginVertical: 5
    }
})