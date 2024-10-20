import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardTypeOptions,
    TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
    placeholder?: string;
    onChangeText?: (text: string) => void
};

const AppDateInputPicker = ({
    placeholder,
    ...props
}: InputProps) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={styles.container}>

            <TextInput
                style={[
                    styles.textInput,
                    {
                        borderBottomWidth: isFocused ? 1.5 : StyleSheet.hairlineWidth,
                        color: activeColor.text,
                        borderBottomColor: isFocused ? Colors.btnPrimaryColor : activeColor.icon
                    },
                ]}
                placeholder={placeholder}
                placeholderTextColor={"#aaa"}
                autoComplete="off"
                autoCorrect={false}
                cursorColor={activeColor.text}
                maxLength={150}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                {...props}
            />
        </View>
    );
};

export default AppDateInputPicker;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    textInput: {
        fontSize: 14,
        width: '100%',
        alignSelf: "center",
        fontFamily: "Poppins-Regular",
        paddingHorizontal: 5


    },

    text: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        marginTop: 10
    },
});
