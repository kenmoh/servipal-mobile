import { Text, View, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";



const welcome = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <View
      style={[styles.container, { backgroundColor: activeColor.background }]}
    >
      <Text style={[styles.text, { color: activeColor.text }]}>Welcome</Text>

    </View>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  text: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",

  },
});
