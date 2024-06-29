import { ThemeContext } from "@/context/themeContext";
import { ReactNode, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


type ActionBtnProp = {
    icon: ReactNode;
    onPress: () => void;
    label?: string;
    height?: number;
    width?: number;
    borderRadius?: number;
    color?: string
    backgroundColor?: string
};

const FloatingActionButton = ({
    icon,
    onPress,
    label,
    height = 60,
    width = 60,
    borderRadius = 35,
    color,
    backgroundColor = "blue",
}: ActionBtnProp) => {

    return (
        <TouchableOpacity
            style={[styles.floatingActionBtn, { width, height, borderRadius, backgroundColor, }]}
            onPress={onPress}
        >
            {label ? (
                <View style={{ flexDirection: "row", alignItems: "center", }}>
                    <View style={{ marginLeft: -6, }}>{icon}</View>
                    <Text style={{ color, fontFamily: 'Poppins-Light' }}>{label}</Text>
                </View>
            ) : (
                icon
            )}
        </TouchableOpacity>
    );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
    floatingActionBtn: {

        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,

    },
});
