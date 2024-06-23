import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";



const PickerItem = ({ label, onPress }: { label: string, onPress: () => {} }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.text, { color: activeColor.text }]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default PickerItem;

const styles = StyleSheet.create({
    text: {
        padding: 10,
        textAlign: "center",
    },
});