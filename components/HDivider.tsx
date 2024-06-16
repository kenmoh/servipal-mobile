import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";


const HDivider = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <View
            style={{
                width: '100%',
                backgroundColor: activeColor.borderolor,
                marginVertical: 5,
                flex: 1,
                height: StyleSheet.hairlineWidth
            }}
        />
    );
};

export default HDivider;

const styles = StyleSheet.create({});
