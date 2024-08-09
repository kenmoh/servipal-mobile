import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { Image } from "expo-image";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export type CardProps = {
    id: string;
    sample_company_image: string;
    average_rating: number;
    numReviews?: number;
    company_name?: string;
    username?: string;
    location: string;
};
const IMAGE_HEIGHT = Dimensions.get("screen").height * 0.3;

const FoodLaundryCard = ({ item }: { item: CardProps }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                router.push({
                    pathname: "(restaurant)/restaurant",
                    params: {
                        id: item.id,
                        companyName: item.company_name,
                        username: item.username,
                        avgRating: item.average_rating,
                        location: item.location,
                        imageUrl: item.sample_company_image,
                        numReview: item.numReviews
                    },
                })
            }
            style={{ marginVertical: 5 }}
        >
            <View style={[styles.container]}>
                <Image source={item.sample_company_image} style={styles.image} />
            </View>
            <View style={[styles.wrapper]}>
                <View>
                    <Text style={[styles.nameText, { color: activeColor.text }]}>
                        {item.company_name || item.username}
                    </Text>

                    <Text style={[styles.locationText, { color: activeColor.text }]}>
                        {item.location}
                    </Text>
                </View>
                <Text style={[styles.locationText, { color: activeColor.text }]}>
                    <Text style={styles.locationText}>4{item.average_rating}</Text>{" "}
                    <AntDesign name="staro" style={{ color: "gold" }} size={10} />{" "}
                    {item.numReviews! > 0
                        ? `(${item.numReviews} reviews)`
                        : "(8 reviews)"}
                </Text>
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
