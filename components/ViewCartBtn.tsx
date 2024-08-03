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
    const translateY = useSharedValue(50);

    useEffect(() => {
        if (totalItem > 0) {
            opacity.value = withTiming(1, {
                duration: 500,
                easing: Easing.out(Easing.exp),
            });
            translateY.value = withTiming(0, {
                duration: 500,
                easing: Easing.out(Easing.exp),
            });
        } else {
            opacity.value = withTiming(0, { duration: 500 });
            translateY.value = withTiming(50, { duration: 500 });
        }
    }, [totalItem]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    if (totalItem === 0) return null;

    return (
        <AnimatedTouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                styles.container,
                { backgroundColor: Colors.btnPrimaryColor },
                animatedStyle,
            ]}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text style={[styles.text, { color: activeColor.text }]}>
                    {label} ({totalItem})
                </Text>
                <Text style={[styles.text, { color: activeColor.text }]}>
                    ₦ {totalCost}
                </Text>
            </View>
        </AnimatedTouchableOpacity>
    );
};

export default ViewCartBtn;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        bottom: 30,
        paddingVertical: 10,
        borderRadius: 7.5,
        zIndex: 999,
        paddingHorizontal: 35,
    },

    text: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
    },
});
