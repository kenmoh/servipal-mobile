import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import ServiceCard from "@/components/ServiceCard";


const services = [
  {
    href: "(tabs)/topTab",
    imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/package.png",
    label: "Send Item(s)",
  },
  {
    href: "(tabs)/food",
    imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/fastfood.png",
    label: "Order Food",
  },
  {
    href: "(tabs)/laundry",
    imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/laundry.png",
    label: "Laundry Services",
  },
  {
    href: "(tabs)/buySell",
    imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/trade.png",
    label: "Buy/Sell",
  },
];

const welcome = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <View
      style={[styles.container, { backgroundColor: activeColor.background }]}
    >
      <Text style={[styles.text, { color: activeColor.text }]}>Quick Aceess</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={services}
        keyExtractor={(item) => item.href.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <ServiceCard
            href={item.href}
            imageUrl={item.imageUrl}
            lable={item.label}
          />
        )}
      />
    </View>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 10
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Black",
    alignSelf: 'flex-start',
    marginVertical: 10
  },
});
