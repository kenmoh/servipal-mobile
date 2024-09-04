import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import CustomBtn from "@/components/CustomBtn";
import { StatusBar } from "expo-status-bar";

const IMG_HEIGHT = Dimensions.get("screen").height * 0.38;
const IMG_WIDTH = Dimensions.get("screen").width;

const ItemDetails = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { imageUrls, name, price, description, stock, seller, id } =
        useLocalSearchParams();
    const images = JSON.parse(imageUrls);
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <Swiper style={{ height: IMG_HEIGHT }}>
                        {images?.map((image: string) => (
                            <Image src={image} key={image} style={styles.image} />
                        ))}
                    </Swiper>
                </View>
                <View
                    style={[
                        styles.container,
                        { backgroundColor: activeColor.background },
                    ]}
                >
                    <View style={{ width: "100%", alignSelf: "center" }}>
                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.lightText, { color: activeColor.icon }]}>
                                {seller}
                            </Text>
                            <Text style={[styles.largeText, { color: activeColor.text }]}>
                                {name}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: 10,
                            }}
                        >
                            <View style={{ flexDirection: "row", gap: 5 }}>
                                <AntDesign
                                    name="staro"
                                    color={"gold"}
                                    size={10}
                                    style={{ marginTop: 2 }}
                                />
                                <Text style={[styles.lightText, { color: activeColor.icon }]}>
                                    4.5
                                </Text>
                            </View>
                            <Text style={[styles.lightText, { color: activeColor.icon }]}>
                                22 reviews
                            </Text>
                            <Text style={[styles.lightText, { color: activeColor.icon }]}>
                                33 Sold
                            </Text>
                            <Text style={[styles.lightText, { color: activeColor.icon }]}>
                                {stock} In Stock
                            </Text>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text style={[styles.lightText, { color: activeColor.text }]}>
                                    Description
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        router.push({
                                            pathname: "(p2p)/reviews",
                                            params: { seller, name, id },
                                        })
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.lightText,
                                            {
                                                color: activeColor.text,
                                                textDecorationLine: "underline",
                                            },
                                        ]}
                                    >
                                        Reviews
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text
                                style={[
                                    styles.lightText,
                                    {
                                        color: activeColor.icon,
                                        marginVertical: 10,
                                        textAlign: "justify",
                                    },
                                ]}
                            >
                                {description}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    flexDirection: "row",
                    width: IMG_WIDTH,
                    alignSelf: "center",
                    justifyContent: "space-between",
                    position: "absolute",
                    bottom: 0,
                    padding: 10,
                }}
            >
                <Text
                    style={[
                        styles.largeText,
                        { color: activeColor.text, alignSelf: "flex-end" },
                    ]}
                >
                    ₦ {price}
                </Text>
                <View>
                    <CustomBtn
                        btnBorderRadius={50}
                        btnColor={Colors.btnPrimaryColor}
                        label="View Cart"
                        onPress={() =>
                            router.push({
                                pathname: "/(p2p)/buyItem",
                                params: { price, id, image: images[0], name, seller },
                            })
                        }
                    />
                </View>
            </View>
        </>
    );
};

export default ItemDetails;

const styles = StyleSheet.create({
    image: {
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        objectFit: "fill",
    },
    container: {
        flex: 1,
        width: "90%",
        alignSelf: "center",
    },
    lightText: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
    },
    largeText: {
        fontFamily: "Poppins-Medium",
        fontSize: 16,
    },
});
