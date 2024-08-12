import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

type CategoryBtnType = {
    label: string;
    isSelected?: boolean;
    onPress?: (name?: string) => void;
};

const CategoryBtn = ({ label, onPress, isSelected, ...props }: CategoryBtnType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                { backgroundColor: isSelected ? 'orange' : activeColor.profileCard, opacity: 0.5 },
            ]}
            {...props}
        >
            <Text
                style={{
                    color: activeColor.text,
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 12,
                    textTransform: "capitalize",
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default CategoryBtn;

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        maxWidth: 400,
        paddingVertical: 5,
        paddingHorizontal: 10,
        opacity: 0.5,
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        height: 30
    },
});
