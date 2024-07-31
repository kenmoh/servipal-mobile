import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";


const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
type FoodCardProp = {
    name: string;
    ingredients: string;
    price: number;
    imageUrl: string;
};

const FoodCard = ({
    name,
    ingredients,
    price,
    imageUrl,

}: FoodCardProp) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { }}
                style={[styles.container, { backgroundColor: activeColor.profileCard }]}
            >
                <View style={{ gap: 10 }}>
                    <View style={{ width: Dimensions.get('screen').width * 0.60 }}>
                        <Text
                            style={{
                                color: activeColor.tabIconDefault,
                                fontFamily: "Poppins-SemiBold",
                                fontSize: 13,
                            }}
                        >
                            {name}
                        </Text>
                        <Text
                            style={{
                                color: activeColor.text,
                                fontFamily: "Poppins-Thin",
                                fontSize: 13,
                                flexShrink: 1,
                                flexWrap: 'wrap',
                            }}
                        >
                            {ingredients}
                        </Text>
                    </View>
                    <Text
                        style={{

                            color: activeColor.text,
                            fontFamily: "Poppins-Bold",
                            fontSize: 15,
                        }}
                    >
                        ₦ {price}
                    </Text>
                </View>
                <View
                    style={{
                        height: 80,
                        width: 100,
                        borderRadius: 5,
                        backgroundColor: "white",
                        overflow: "hidden",

                    }}
                >
                    <Image
                        src={imageUrl}
                        style={{
                            height: "100%",
                            width: "100%",
                            overflow: "hidden",
                            objectFit: "fill",

                        }}
                    />
                </View>
            </TouchableOpacity>

        </>
    );
};

export default FoodCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 5,


    },
});
