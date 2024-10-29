import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,

} from "react-native";
import React, { memo, useContext, useState } from "react";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useCart } from "./CartProvider";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";

const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export type MealType = {
    id: string;
    restaurant_id: string;
    laundry_id: string;
    name: string;
    price: number;
    quantity: number;
    preparation_time: string;
    side?: string;
    ingredients?: string;
    image_url?: string;

};

const FoodCard = ({ meal, style }: { meal: MealType, style?: object }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { cart, addToCart, removeFromCart, setOrderType } = useCart();
    const isItemInCart = cart.items.some((cartItem) => cartItem.id === meal.id);
    const [isChecked, setIsChecked] = useState(isItemInCart);


    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (newCheckedState) {
            addToCart(meal);
            setOrderType('food')
        } else {
            removeFromCart(meal);
        }
    };
    return (
        <>
            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.container, { backgroundColor: activeColor.profileCard, ...style }]}
                onPress={handleCheckboxChange}
            >
                <View style={[styles.topWrapper]}>
                    <View style={styles.topHeader}>
                        <Text style={[styles.titletext, { color: activeColor.text }]}>
                            {meal.name}
                        </Text>
                        <View>
                            <Text style={[styles.smallText, { color: activeColor.text }]}>
                                {meal.ingredients}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Image
                            source={meal?.image_url}
                            placeholder={{ blurhash }}
                            contentFit="cover"
                            transition={1000}
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.bottomWrapper}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                        <BouncyCheckBox
                            isChecked={isItemInCart}
                            iconStyle={{ borderRadius: 5 }}
                            fillColor="teal"
                            size={20}
                            innerIconStyle={{ borderRadius: 5, borderColor: "teal" }}
                            onPress={handleCheckboxChange}
                            style={{ width: 20, marginTop: -5 }}
                        />
                        <Text style={[styles.titletext, { color: activeColor.text }]}>
                            {" "}
                            ₦ {meal.price}
                        </Text>

                        {meal.preparation_time && <View
                            style={[
                                styles.timeWrapper,
                                {
                                    backgroundColor: activeColor.background,
                                    opacity: 0.4,
                                    borderRadius: 20,
                                    paddingHorizontal: 10,
                                },
                            ]}
                        >
                            <AntDesign name="clockcircleo" color={activeColor.icon} size={14} />
                            <Text
                                style={[
                                    styles.smallText,
                                    { color: activeColor.text, marginTop: 5 },
                                ]}
                            >
                                {meal.preparation_time} mins
                            </Text>
                        </View>}

                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default memo(FoodCard);

const styles = StyleSheet.create({
    container: {
        width: "95%",
        alignSelf: "center",
        padding: 10,
        marginVertical: 3,
        borderRadius: 5,
        borderCurve: "continuous",
    },
    topWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    bottomWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 10,
    },
    topHeader: {
        flexWrap: "wrap",
        flex: 1,
    },
    Text: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
    },
    btnContainer: {
        width: 30,
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 6,

    },
    ingredientText: {
        flexShrink: 1,
    },
    timeWrapper: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    image: {
        height: 65,
        width: 90,
        borderRadius: 5,
        borderCurve: "continuous",
    },
    titletext: {
        fontFamily: "Poppins-Medium",
        fontSize: 15,
    },

    smallText: {
        fontFamily: "Poppins-Light",
        fontSize: 12,
    },
});
