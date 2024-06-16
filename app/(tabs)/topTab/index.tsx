import { useContext, useState } from "react";
import OrderCard from "@/components/OrderCard";
import { Colors, themeMode } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Switch,
} from "react-native";
import ordersApi from "@/api/orders";
import { ThemeContext } from "@/context/themeContext";
import { Link } from "expo-router";
import HDivider from "@/components/HDivider";

const index = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isHomeScreen, setIsHomeScreen] = useState(true)
  let activeColor = Colors[theme.mode];
  const {
    data: order,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getListings,
  });




  if (isLoading || isFetching) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: activeColor.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={30} color={activeColor.tabIconDefault} />
      </View>
    );
  }
  if (error) {
    <View
      style={{
        flex: 1,
        backgroundColor: activeColor.background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Something went wrong!</Text>
    </View>;
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: activeColor.background }}>
        <FlatList
          data={order?.data}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => item.order_status === "Pending" &&
            item.payment_status === "paid" && (<OrderCard order={item} isHomeScreen={isHomeScreen} />)}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          vertical

        />

      </View>
      {/* <Link href='/order/payment' style={{ fontSize: 40 }}>Payment</Link> */}
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
