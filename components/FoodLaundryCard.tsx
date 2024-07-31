import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Image
} from "react-native";
import React, { useContext } from "react";
// import { Image } from "expo-image";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

type CardProps = {
    imageUrl: string;
    average_rating: number;
    numReviews?: number;
    vendor_name: string;
    address: string;
};
const CARD_HEIGHT = Dimensions.get("screen").height * 0.30;

const FoodLaundryCard = ({
    vendor_name,
    address,
    average_rating,
    imageUrl,
    numReviews
}: CardProps) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => { }}
            style={[styles.container, { backgroundColor: activeColor.profileCard }]}
        >
            <View style={{ height: '70%' }}>
                <Image src={imageUrl} style={styles.image} resizeMode="cover" resizeMethod="resize" />
            </View>
            <View style={[styles.wrapper,]}>
                <View>
                    <Text style={[styles.nameText, { color: activeColor.text }]}>
                        {vendor_name}
                    </Text>

                    <Text style={[styles.addressText, { color: activeColor.text }]}>
                        {address}
                    </Text>
                </View>
                <Text style={[styles.nameText, { color: activeColor.text }]}>
                    {average_rating}{numReviews! > 0 ? `(${numReviews})` : ''}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default FoodLaundryCard;

const styles = StyleSheet.create({
    container: {
        maxHeight: CARD_HEIGHT,
        width: '100%',
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden'
    },
    textContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    nameText: {
        fontSize: 14,
        fontFamily: "Poppins-Light",
    },

    addressText: {
        fontSize: 12,
        fontFamily: "Poppins-Thin",
    },
    image: {
        height: "100%",
        width: "100%",

    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
});
