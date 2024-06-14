import { StyleSheet, Text, View, FlatList, ListRenderItem } from "react-native";
import React, { useContext } from "react";

import { Colors, themeMode } from "@/constants/Colors";
import OrderCard from "@/components/OrderCard";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import orderApi from "@/api/orders";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { useQuery } from "@tanstack/react-query";
import { OrderType } from "@/utils/types";

const myOrder = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { user } = useAuth();

  const { error, isSuccess, isPending, data } = useQuery({
    queryKey: ["sender-orders", user],
    queryFn: orderApi.getVendorListings,
  });

  return (
    <>
      <CustomActivityIndicator visible={isPending} />
      <View
        style={[styles.container, { backgroundColor: activeColor.background }]}
      >
        <FlatList
          data={data?.data}
          keyExtractor={(item: OrderType) => item?.id!.toString()}
          renderItem={({ item }) =>
            item.vendor_username === user?.username ? (
              <OrderCard order={item} />
            ) : item.dispatch_company_name === user?.company_name ? (
              <OrderCard order={item} />
            ) : (
              item.rider_phone_number === user?.phone_number &&
              item.dispatch_company_name === user?.dispatch && <OrderCard order={item} />
            )
          }
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          vertical
        />
      </View>
    </>
  );
};

export default myOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
