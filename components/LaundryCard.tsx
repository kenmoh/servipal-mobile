import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useCart } from "./CartProvider";
import HDivider from "./HDivider";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";

const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export type LaundryType = {
    id: string;
    laundry_id: string;
    restaurant_id: string;
    name: string;
    price: number;
    quantity: number;
    image_url?: string;

};

const LaundryCard = ({ laundry }: { laundry: LaundryType }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { cart, addToCart, removeFromCart, setOrderType } = useCart();
    const isItemInCart = cart.items.some((cartItem) => cartItem.id === laundry.id);
    const [isChecked, setIsChecked] = useState(isItemInCart);


    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (newCheckedState) {
            addToCart(laundry);
            setOrderType('laundry')
        } else {
            removeFromCart(laundry);
        }
    };
    return (
        <>
            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.container, { backgroundColor: activeColor.profileCard }]}
                onPress={handleCheckboxChange}
            >
                <View style={[styles.topWrapper]}>
                    <View>
                        <BouncyCheckBox
                            isChecked={isItemInCart}
                            iconStyle={{ borderRadius: 5 }}
                            fillColor="teal"
                            size={20}
                            innerIconStyle={{ borderRadius: 5, borderColor: "teal" }}
                            onPress={handleCheckboxChange}
                            style={{ width: 20, marginTop: -5 }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.titletext, { color: activeColor.icon, fontFamily: 'Poppins-Regular', }]}>{laundry.name}</Text>
                        <Text style={[styles.titletext, { color: activeColor.text }]}>₦ {laundry.price}</Text>
                    </View>
                </View>
                <View>
                    <Image
                        source={laundry?.image_url}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
        </>
    );
};

export default LaundryCard;

const styles = StyleSheet.create({
    container: {
        width: "95%",
        alignSelf: "center",
        padding: 10,
        marginVertical: 3,
        borderRadius: 5,
        borderCurve: "continuous",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        alignItems: 'center'
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


});
