import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";

type InputProps = {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  inputHeight?: number
  // inputBorderWidth?: number;
  // inputBorderColor?: string;
  // inputBackgroundColor?: string;
  // hasBorder?: boolean;
  labelColor?: string;
  inputTextColor: string;
  borderRadius?: number
};

const CustomTextInput = ({
  label,
  labelColor,
  placeholder,
  secureTextEntry,
  keyboardType,
  borderRadius = 5,
  inputHeight = 45,
  ...props
}: InputProps) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
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
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={"#aaa"}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoComplete="off"
        autoCorrect={false}
        cursorColor={"gray"}
        maxLength={150}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
  },
  textInput: {
    paddingVertical: 7.5,
    fontSize: 14,
    paddingHorizontal: 10,
    width: "100%",

    marginVertical: 5,
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
