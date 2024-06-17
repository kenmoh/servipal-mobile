import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";


const TransferCard = ({ title, details }: { title: string, details: string }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <>
            <View style={styles.container}>
                <Text style={[styles.text, { color: activeColor.text }]}>{title}</Text>
                <Text style={[styles.text, { color: activeColor.text }]}>{details}</Text>
            </View>
        </>
    );
};

export default TransferCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        width: "100%",
    },

    text: {

        fontSize: 12,
        fontFamily: 'Poppins-SemiBold'
    },
});