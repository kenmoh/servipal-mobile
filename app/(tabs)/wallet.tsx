import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import CustomBtn from "@/components/CustomBtn";

const wallet = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  return (
    <View
      style={[styles.container, { backgroundColor: activeColor.background }]}
    >
      <View style={{ backgroundColor: activeColor.profileCard }}>
        <View>
          <Text>Your Balance</Text>
          <AntDesign name="eye" size={24} color={activeColor.icon} />
        </View>
        <Text>NGN 55,000</Text>
        <CustomBtn
          label="Withdraw Funds"
          btnBorderRadius={10}
          btnColor={Colors.btnPrimaryColor}
          onPress={() => { }}
        />
      </View>
    </View>
  );
};

export default wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
