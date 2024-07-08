import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";

const welcome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <Redirect href={"(tabs)/topTab"} />
    </View>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 30,
    fontFamily: "Poppins-Black",
  },
});
