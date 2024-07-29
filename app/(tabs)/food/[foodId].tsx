import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import CustomBtn from "@/components/CustomBtn";
import QuantityBtn from "@/components/quantityBtn";
import { Stack } from "expo-router";

const IMG_HEIGHT = Dimensions.get('screen').height * 0.35

type FoodDetailProps = {
    name: string;
    price: number;
    description: string;
    preparationTime: string;
    quantity: number;
    imageUrl: string;
    onPress: () => void;
};

const InfoText = ({
    label,
    item,
}: {
    label: string;
    item: string | number;
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    gap: 10,
                    marginVertical: 5,
                    backgroundColor: activeColor.background,
                }}
            >
                <Text
                    style={{
                        color: activeColor.text,
                        fontFamily: "Poppins-Bold",
                        fontSize: 12,
                    }}
                >
                    {label}
                </Text>
                <Text
                    style={{
                        color: activeColor.text,
                        fontFamily: "Poppins-Light",
                        fontSize: 12,
                    }}
                >
                    {item}
                </Text>
            </View>
        </>
    );
};

const FoodDetails = ({
    name,
    price,
    description,
    preparationTime,
    quantity,
    onPress,
    imageUrl,
}: FoodDetailProps) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <>
            <Stack />
            <View
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >
                <Image source={imageUrl} style={{ height: IMG_HEIGHT, objectFit: 'cover' }} />
                <View
                    style={{
                        flexDirection: "row",
                        gap: 10,
                        backgroundColor: activeColor.background,
                    }}
                >
                    <Text style={[styles.text, { color: activeColor.text }]}>{name}</Text>
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        ₦ {price}
                    </Text>
                </View>
                <View>
                    <InfoText label="Descriprion" item={description} />
                    <InfoText label="Preparation Time" item={preparationTime} />
                </View>
                <View style={styles.btnContainer}>
                    <QuantityBtn inCreament={onPress} deCreament={onPress} quantity={quantity} />
                    <CustomBtn
                        label={`Add ${totalPrice}`}
                        btnBorderRadius={5}
                        btnColor={Colors.btnPrimaryColor}
                        onPress={() => { }}
                    />
                </View>
            </View>
        </>
    );
};

export default FoodDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
    },
    btnContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});
