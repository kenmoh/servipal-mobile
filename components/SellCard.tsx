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

const IMAGE_WIDTH = Dimensions.get("screen").width * 0.45;
const IMAGE_HEIGHT = Dimensions.get("screen").height * 0.23;

type SellerType = {
    username: string;
};
export type CardType = {
    id: number;
    name: string;
    price: number;
    stock: number;
    image_urls: string[];
    description: string;
    average_rating?: number;
    num_ratings?: number;
    total_sold?: number;
    seller: SellerType;
};
const SellCard = ({
    item,
    isLastItem,
}: {
    item: CardType;
    isLastItem: boolean;
}) => {
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
                        average_rating: item.average_rating,
                        num_ratings: item.num_ratings,
                        totalSold: item.total_sold,
                        description: item.description,
                        price: item.price,
                        stock: item.stock,
                        seller: item.seller.username,
                    },
                })
            }
            style={{ marginBottom: SIZES.marginLarge }}
        >
            <View style={styles.container}>
                <Image
                    source={item?.image_urls[0]}
                    style={styles.image}
                    contentFit="cover"
                />
            </View>
            {item.average_rating && (
                <View
                    style={{
                        backgroundColor: activeColor.profileCard,
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 30,
                        position: 'absolute',
                        opacity: 0.8,
                        right: 5,
                        top: 5,

                    }}
                >
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        {item.average_rating}
                        <AntDesign name="staro" color={Colors.btnPrimaryColor} size={10} />
                    </Text>
                </View>
            )}

            <View style={{ marginTop: 5 }}>
                <View style={{ width: IMAGE_WIDTH }}>
                    <Text style={[styles.text, { color: activeColor.icon }]}>
                        {item?.seller.username}
                    </Text>
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        {item?.name}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            { color: Colors.btnPrimaryColor, fontSize: 15 },
                        ]}
                    >
                        ₦ {item?.price}
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
        borderRadius: 5,
        borderCurve: "continuous",
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
    },
});
