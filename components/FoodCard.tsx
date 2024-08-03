import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,

} from "react-native";
import React, { useContext } from "react";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useCart } from "./CartProvider";


const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";


export type MealType = {
    id: string;
    vendor_id: string;
    name: string;
    price: number;
    quantity: number;
    side?: string;
    ingredients?: string;
    image_url?: string;
};

const FoodCard = ({ meal }: { meal: MealType }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { cart, addToCart, removeFromCart } = useCart();
    const isItemInCart = cart.foods.some((cartItem) => cartItem.id === meal.id);

    const handleCheckboxChange = (isChecked: boolean) => {
        if (isChecked) {
            addToCart(meal);
        } else {
            removeFromCart(meal);
        }
    };


    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => { }}
                style={[styles.container]}
            >
                <View>
                    <View style={{ maxWidth: "70%", flexDirection: "row" }}>
                        <BouncyCheckBox
                            isChecked={isItemInCart}
                            iconStyle={{ borderRadius: 5 }}
                            fillColor="teal"
                            size={20}
                            innerIconStyle={{ borderRadius: 5, borderColor: 'grey' }}
                            onPress={handleCheckboxChange}
                        />
                        <View style={{}}>
                            <Text
                                style={{
                                    color: activeColor.tabIconDefault,
                                    fontFamily: "Poppins-SemiBold",
                                    fontSize: 13,
                                }}
                            >
                                {meal.name}
                            </Text>
                            <Text
                                style={{
                                    color: activeColor.text,
                                    fontFamily: "Poppins-Thin",
                                    fontSize: 13,
                                    flexShrink: 1,
                                    flexWrap: "wrap",
                                }}
                            >
                                {meal.ingredients}
                            </Text>
                            <Text
                                style={{
                                    color: activeColor.text,
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 12,
                                }}
                            >
                                ₦ {meal.price}
                            </Text>
                        </View>
                    </View>
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
                        src={meal.image_url}
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
        alignItems: "center",
        marginVertical: 10,
        width: "100%",
    },
});
