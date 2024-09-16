import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Image } from "expo-image";

import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import userApi from '@/api/users'


export type CardProps = {
    id: string;
    sample_company_image: string;
    average_rating: number;
    numReviews?: number;
    vendor_company_name?: string;
    opening_hour: string;
    location: string;
    closing_hour: string;
};
const IMAGE_HEIGHT = Dimensions.get("screen").height * 0.35;

const FoodLaundryCard = ({ item, isLaundry, isLastItem }: { item: CardProps, isLaundry: boolean, isLastItem: boolean }) => {

    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { data: reviews } = useQuery({
        queryKey: ['reviews', item.id],
        queryFn: () => userApi.getUserReviews(item.id)
    })

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                router.push({
                    pathname: isLaundry ? "(laundry)/laundry" : "(restaurant)/restaurant",
                    params: {
                        id: item.id,
                        companyName: item.vendor_company_name,
                        avgRating: reviews?.data?.average_rating,
                        location: item.location,
                        imageUrl: item.sample_company_image,
                        numReview: reviews?.data?.total_reviews,
                        closingHour: item?.closing_hour,
                        openingHour: item?.opening_hour
                    },
                })
            }
            style={{ marginVertical: 5, marginBottom: isLastItem ? 80 : 0, }}
        >
            <View style={[styles.container]}>
                <Image source={item.sample_company_image} style={styles.image} />
            </View>
            <View style={[styles.wrapper]}>
                <View>
                    <Text style={[styles.nameText, { color: activeColor.text }]}>
                        {item.vendor_company_name}
                    </Text>

                    <Text style={[styles.locationText, { color: activeColor.text }]}>
                        {item.location}
                    </Text>
                </View>
                {
                    reviews?.data?.reviews?.length > 0 && (
                        <Text style={[styles.locationText, { color: activeColor.text }]}>
                            <Text style={styles.locationText}>{reviews?.data?.average_rating}</Text>{" "}
                            <AntDesign name="staro" style={{ color: "gold" }} size={10} />{" "}
                            ({reviews?.data?.total_reviews} {reviews?.data?.total_reviews === 1 ? 'review' : 'reviews'})
                        </Text>
                    )
                }
            </View>
        </TouchableOpacity>
    );
};

export default FoodLaundryCard;

const styles = StyleSheet.create({
    container: {
        maxHeight: IMAGE_HEIGHT,
        width: "100%",
        borderRadius: 20,
        marginVertical: 10,
        overflow: "hidden",
    },
    textContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    nameText: {
        fontSize: 13,
        fontFamily: "Poppins-SemiBold",
    },

    locationText: {
        fontSize: 11,
        fontFamily: "Poppins-Thin",
    },
    image: {

        aspectRatio: 4 / 2.25
    },
    wrapper: {
        gap: 3,
    },
});
