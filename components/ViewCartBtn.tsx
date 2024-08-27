import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from "react-native-reanimated";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

type ViewCartBtnType = {
    totalCost: string;
    label: string;
    totalItem: number;
    onPress: () => void;
};

const ViewCartBtn = ({ totalCost, totalItem, onPress, label }: ViewCartBtnType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const opacity = useSharedValue(0);


    useEffect(() => {
        if (totalItem > 0) {
            opacity.value = withTiming(1, {
                duration: 1500,
                easing: Easing.out(Easing.exp),
            });

        }
    }, [totalItem]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,

        };
    });

    if (totalItem === 0) return null;

    return (
        <AnimatedTouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                styles.container,

                animatedStyle,
            ]}
        >
            <Text style={[styles.text, { color: activeColor.text, fontSize: 20, alignSelf: 'flex-end' }]}>
                ₦ {totalCost}
            </Text>
            <View
                style={{

                    alignItems: "center",
                    backgroundColor: Colors.btnPrimaryColor,
                    paddingVertical: 10,
                    paddingHorizontal: 35,
                    borderRadius: 35
                }}
            >
                <Text style={[styles.text, { color: activeColor.text }]}>
                    {label} ({totalItem})
                </Text>

            </View>
        </AnimatedTouchableOpacity>
    );
};

export default ViewCartBtn;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        bottom: 0,
        flexDirection: 'row',
        borderRadius: 7.5,
        zIndex: 999,
        justifyContent: 'space-between',
        paddingVertical: 5

    },

    text: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
    },
});
