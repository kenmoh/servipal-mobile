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
import { SIZES } from "@/constants/Sizes";


const IMAGE_WIDTH = Dimensions.get("screen").width * 0.9;
const IMAGE_HEIGHT = Dimensions.get("screen").height * 0.25;

type SellerType = {
    username: string
}
export type CardType = {
    id: number;
    name: string;
    price: number;
    stock: number;
    image_urls: string[];
    description: string;
    avgRating?: number;
    numReviews?: number;
    total_sold?: number;
    seller: SellerType
};
const SellCard = ({ item, isLastItem }: { item: CardType, isLastItem: boolean }) => {
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
                        imageUrls: JSON.stringify(item.image_urls),
                        name: item.name,
                        totalSold: item.total_sold,
                        description: item.description,
                        price: item.price,
                        stock: item.stock,
                        seller: item.seller.username
                    },
                })
            }
            style={{ marginBottom: SIZES.marginLarge }}
        >
            <View style={styles.container}>
                <Image source={item?.image_urls[0]} style={styles.image} contentFit="cover" />
            </View>
            <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text style={[styles.text, { color: Colors.btnPrimaryColor, fontSize: 15 }]}>
                        ₦ {item?.price}
                    </Text>
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        4{item.avgRating}
                        <AntDesign name="staro" color={Colors.btnPrimaryColor} size={10} />

                    </Text>
                </View>
                <View>
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        {item?.name}
                    </Text>
                </View>
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
        borderRadius: 10,
        borderCurve: "continuous",
    },
    text: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
    },
});
