import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

interface RenderBtnProps {
    title: string;
    orderType: string;
    isActive: boolean;
    onPress: (orderType: string) => void;
}

const RenderBtn = ({ title, orderType, isActive, onPress }: RenderBtnProps) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <TouchableOpacity
            onPress={() => onPress(orderType)}
            style={[
                styles.container,
                {
                    backgroundColor: isActive
                        ? Colors.btnPrimaryColor
                        : activeColor.profileCard,
                },
            ]}
        >
            <View style={{
                paddingVertical: 6,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <Text
                    style={{
                        color: activeColor.text,
                        fontFamily: "Poppins-Medium",
                        fontSize: 12,
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default RenderBtn;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderRadius: 5,
        marginLeft: 10
    },
});
