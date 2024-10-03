import { StyleSheet, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ReviewCard from '@/components/ReviewCard'

import { ThemeContext } from '@/context/themeContext'
import { Colors } from '@/constants/Colors'
import { RatingType } from '@/utils/types'

const reviews = () => {
    const { reviews } = useLocalSearchParams()
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const reviewData: RatingType = JSON.parse(reviews)


    return (
        <ScrollView style={{ flex: 1, backgroundColor: activeColor.background }}>

            {reviewData?.reviews.map(review => <ReviewCard review={review} />)}
        </ScrollView>
    )
}

export default reviews

const styles = StyleSheet.create({})