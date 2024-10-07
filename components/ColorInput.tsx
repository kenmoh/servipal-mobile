import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardTypeOptions,
    TextInputProps,
    TouchableOpacity,
} from "react-native";


interface InputProps extends TextInputProps {
    onPress?: () => void
    keyboardType?: KeyboardTypeOptions;
    inputHeight?: number
    borderRadius?: number
    inputBackgroundColor: string
    onChangeText?: (text: string) => void
};

const ColorInput = ({
    inputBackgroundColor,
    onPress,
    onChangeText
}: InputProps) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={[styles.container, { backgroundColor: inputBackgroundColor || activeColor.inputBackground }]}>

            <TextInput
                onChangeText={onChangeText}
                style={[
                    styles.textInput,
                    {
                        color: inputBackgroundColor === '#ffff' || inputBackgroundColor === 'white' ? 'black' : activeColor.text,
                        backgroundColor: inputBackgroundColor
                    },
                ]}
                onPressIn={() => console.log('Presses!')}
                editable={false}
                value={inputBackgroundColor}
            />
            <TouchableOpacity
                hitSlop={10}
                activeOpacity={.6}
                onPress={onPress}
            >
                <MaterialCommunityIcons name="minus" size={25}
                    color={activeColor.icon}

                />
            </TouchableOpacity>
        </View>
    );
};

export default ColorInput;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        maxWidth: 100,
        borderCurve: 'continuous',
        borderRadius: 50,
        paddingHorizontal: 10
    },
    textInput: {
        paddingVertical: 7.5,
        fontSize: 14,
        borderRadius: 50,
        fontFamily: "Poppins-Regular",
        borderCurve: 'continuous',
        flex: 1,


    },

    text: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        marginTop: 10
    },
});
