import { Text, View, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { Redirect } from "expo-router";



const indes = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <View style={[styles.container, { backgroundColor: activeColor.background }]}><Redirect href={'(auth)/welcome'} /></View>
  );
};

export default indes;

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
