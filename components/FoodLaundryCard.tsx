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

type CardProps = {
    imageUrl: string;
    average_rating: number;
    vendor_name: string;
    address: string;
    onPress: () => void;
};
const CARD_HEIGHT = Dimensions.get("screen").height * 0.30;
const FoodLaundryCard = ({
    vendor_name,
    address,
    average_rating,
    imageUrl,
    onPress,
}: CardProps) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            style={[
                styles.container,
                {
                    backgroundColor: activeColor.background,
                },
            ]}
        >
            <Image source={imageUrl} style={styles.image} />
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[styles.nameText, { color: activeColor.text }]}>
                        {vendor_name}
                    </Text>
                    <Text style={[styles.addressText, { color: activeColor.text }]}>
                        {address}
                    </Text>
                </View>
                <Text style={[styles.nameText, { color: activeColor.text }]}>
                    {average_rating}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default FoodLaundryCard;

const styles = StyleSheet.create({
    container: {
        maxHeight: CARD_HEIGHT,
        borderRadius: 5,
    },
    textContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    nameText: {
        fontSize: 14,
        fontFamily: "Poppins-SemiBold",
    },

    addressText: {
        fontSize: 12,
        fontFamily: "Poppins-Light",
    },
    image: {
        height: "100%",
        width: "100%",
        objectFit: "cover",
    },
});
