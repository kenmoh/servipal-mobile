import { StyleSheet, View, FlatList, Platform, AppState, ActivityIndicator, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import type { AppStateStatus } from 'react-native'
import { focusManager } from '@tanstack/react-query'

import { Colors } from "@/constants/Colors";
import OrderCard from "@/components/OrderCard";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import orderApi from "@/api/orders";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { useQuery } from "@tanstack/react-query";
import { ItemOrderType } from "@/utils/types";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";



const myOrder = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { user } = useAuth();

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active')
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [])




  const { error, isFetching, isPending, data: order, refetch } = useQuery({
    queryKey: ["sender-orders", user?.id],
    queryFn: orderApi.getVendorListings,
  });

  const handleRefresch = () => refetch()
  useRefreshOnFocus(refetch)

  if (isFetching || isFetching) {
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
      <CustomActivityIndicator visible={isPending} />

      <View
        style={[styles.container, { backgroundColor: activeColor.background }]}
      >
        <FlatList
          data={order?.data}
          keyExtractor={(item: ItemOrderType) => item?.id?.toString()}
          renderItem={({ item }) => {
            console.log(item.rider_phone_number)
            return (item.vendor_username === user?.username ? (
              <OrderCard order={item} />
            ) : item.dispatch_company_name === user?.company_name ? (
              <OrderCard order={item} />
            ) : (
              (item.rider_phone_number === user?.phone_number && item.dispatch_company_name === user?.dispatch) &&
              <OrderCard order={item} isHomeScreen={false} />
            ))
          }
          }
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          vertical
          refreshing={isFetching}
          onRefresh={handleRefresch}
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
