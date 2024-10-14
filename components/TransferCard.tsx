import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";


const TransferCard = ({ title, details, onPress }: { title: string, details: string, onPress?: () => void }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <>
            <View style={styles.container}>
                <Text style={[styles.text, { color: activeColor.text }]}>{title}</Text>
                <View style={{ alignItems: 'center', gap: 5, flexDirection: 'row' }}>
                    <Text style={[styles.text, { color: activeColor.text }]}>{details}</Text>
                    <TouchableOpacity hitSlop={25} activeOpacity={0.3} onPress={onPress}>
                        <Ionicons name="copy-outline" size={20} />
                    </TouchableOpacity>
                </View>
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