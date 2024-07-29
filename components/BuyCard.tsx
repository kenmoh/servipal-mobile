import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const CARD_HEIGHT = Dimensions.get("screen").height * 0.3;
const CARD_WIDTH = Dimensions.get("screen").width * 0.5;

type CardProp = {
    imageUrl: string;
    username: string;
    amount: number;
    rating: string;
    onPress: () => void;
};

const BuyCard = ({ imageUrl, onPress, username, rating, amount }: CardProp) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, { backgroundColor: activeColor.background }]}
        >
            <Image source={imageUrl} style={styles.image} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <View>
                    <Text style={[{ fontFamily: 'Poppins-SemiBold', color: activeColor.text }]}>{amount}</Text>
                    <Text style={[styles.addressText, { color: activeColor.text }]}>{username}</Text>
                </View>
                <Text style={[styles.addressText, { color: activeColor.text }]}>{rating}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BuyCard;

const styles = StyleSheet.create({
    container: {
        maxHeight: CARD_HEIGHT,
        maxWidth: CARD_WIDTH,
    },

    image: {
        height: '100%',
        width: '100%',
        objectFit: 'fill'
    },
    addressText: {
        fontSize: 14,
        fontFamily: "Poppins-Light",
    },
});
