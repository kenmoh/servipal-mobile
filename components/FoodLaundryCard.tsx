import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Image } from "expo-image";

import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import restaurant from "@/assets/images/restaurant.jpg";
import { CardProps } from "@/utils/types";


const IMAGE_HEIGHT = Dimensions.get("screen").height * 0.35;

const FoodLaundryCard = ({
    item,
    isLaundry,
    isLastItem,
}: {
    item: CardProps;
    isLaundry: boolean;
    isLastItem: boolean;
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                router.push({
                    pathname: isLaundry ? `(laundry)/${item.id}` : `(restaurant)/${item.id}`,
                    params: {
                        id: item.id,
                    },
                })
            }
            style={{ marginVertical: 5, marginBottom: isLastItem ? 80 : 0 }}
        >
            <View style={[styles.container]}>
                <Image
                    source={item.company_background_image || restaurant}
                    style={styles.image}
                />
            </View>
            <View style={[styles.wrapper]}>
                <View>
                    <Text style={[styles.nameText, { color: activeColor.text }]}>
                        {item.company_name}
                    </Text>

                    <Text style={[styles.locationText, { color: activeColor.text }]}>
                        {item.location}
                    </Text>
                </View>

                {item?.rating?.number_of_ratings >= 1 && <Text style={[styles.locationText, { color: activeColor.text }]}>
                    <Text style={styles.locationText}>
                        {item.rating.average_rating}
                    </Text>{" "}
                    <AntDesign name="staro" style={{ color: "gold" }} size={10} /> (
                    {item?.rating.number_of_ratings}{" "}
                    {item?.rating.number_of_ratings === 1 ? "review" : "reviews"})
                </Text>}

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
        fontFamily: "Poppins-Light",
    },
    image: {
        aspectRatio: 4 / 2.25,
    },
    wrapper: {
        gap: 3,
    },
});
