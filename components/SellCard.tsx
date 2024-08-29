import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext } from "react";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { router } from "expo-router";

const IMAGE_HEIGHT = Dimensions.get("screen").height * 0.22;
const IMAGE_WIDTH = Dimensions.get("screen").width * 0.45;

type CardType = {
    id: number;
    name: string;
    price: number;
    stock: number;
    image_url: string;
    image_urls: string[];
    description: string;
    avgRating?: number;
    numReviews?: number;
};
const SellCard = ({ item }: { item: CardType }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
                router.push({
                    pathname: `/(p2p)/${item.id}`,
                    params: {
                        id: item.id,
                        imageUrl: item.image_url,
                        imageUrls: JSON.stringify(item.image_urls),
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        stock: item.stock,
                    },
                })
            }
        >
            <View style={styles.container}>
                <Image source={item.image_url} style={styles.image} contentFit="fill" />
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={[styles.text, { color: Colors.btnPrimaryColor }]}>
                    ₦ {item?.price}
                </Text>
                <View>
                    <Text style={[styles.text, { color: activeColor.icon }]}>
                        {item?.name}
                    </Text>
                </View>
                <Text style={[styles.text, { color: activeColor.icon, fontSize: 10 }]}>
                    {item.avgRating}{" "}
                    <AntDesign name="staro" color={Colors.btnPrimaryColor} size={8} /> ({" "}
                    {item?.numReviews} reviews)
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default SellCard;

const styles = StyleSheet.create({
    container: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
        borderCurve: "continuous",
    },
    text: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
    },
});
