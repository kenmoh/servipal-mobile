import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { Image } from "expo-image";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

type FoodCardProp = {
    name: string;
    descriptinon: string;
    price: string;
    imageUrl: string;
    onPress: () => void;
};

const FoodCard = ({
    name,
    descriptinon,
    price,
    imageUrl,
    onPress,
}: FoodCardProp) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            style={[styles.container, { backgroundColor: activeColor.background }]}
        >
            <View style={{ gap: 3 }}>
                <Text
                    style={{
                        color: activeColor.text,
                        fontFamily: "Pippins-SemiBold",
                        fontSize: 14,
                    }}
                >
                    {name}
                </Text>
                <Text
                    style={{
                        color: activeColor.text,
                        fontFamily: "Pippins-Light",
                        fontSize: 13,
                    }}
                >
                    {descriptinon}
                </Text>
                <Text
                    style={{
                        color: activeColor.text,
                        fontFamily: "Pippins-Bold",
                        fontSize: 15,
                    }}
                >
                    ₦ {price}
                </Text>
            </View>
            <View style={{ width: 300, height: 300, borderRadius: 10 }}>
                <Image
                    source={imageUrl}
                    style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                        overflow: "hidden",
                    }}
                />
            </View>
        </TouchableOpacity>
    );
};

export default FoodCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "100%",
        marginVertical: 5
    },
});
