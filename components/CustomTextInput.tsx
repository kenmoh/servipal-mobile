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
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  inputHeight?: number
  labelColor?: string;
  inputTextColor?: string;
  borderRadius?: number
  inputBackgroundColor?: string
  onChangeText?: (text: string) => void
};

const CustomTextInput = ({
  label,
  labelColor,
  placeholder,
  secureTextEntry,
  keyboardType,
  borderRadius = 50,
  inputHeight = 50,
  ...props
}: InputProps) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: labelColor }]}>{label}</Text>
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: activeColor.inputBackground,
            color: activeColor.text,
            height: inputHeight,
            borderRadius,
            borderWidth: isFocused ? 1.5 : 0,
            borderColor: isFocused ? Colors.btnPrimaryColor : ''
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={"#aaa"}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
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

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  textInput: {
    paddingVertical: 7.5,
    fontSize: 14,
    paddingHorizontal: 20,
    width: "100%",

    alignSelf: "center",
    fontFamily: "Poppins-Light",
    borderCurve: 'continuous',

  },

  text: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginTop: 10
  },
});
