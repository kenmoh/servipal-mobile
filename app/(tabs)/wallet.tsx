import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import CustomBtn from "@/components/CustomBtn";
import WalletCard from "@/components/WalletCard";

const wallet = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  const data = [
    {
      id: 1,
      name: 'One'
    },
    {
      id: 2,
      name: 'Two'
    },
    {
      id: 3,
      name: 'Three'
    },
  ]

  return (
    <View
      style={[styles.container, { backgroundColor: activeColor.background }]}
    >
      <FlatList data={data}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        ListHeaderComponent={<WalletCard />}
      />

    </View>
  );
};

export default wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
});
