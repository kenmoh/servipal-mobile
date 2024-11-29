import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import OrderCard from "@/components/OrderCard";
import { Colors } from "@/constants/Colors";
import { focusManager, useQuery } from "@tanstack/react-query";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Platform,
  AppStateStatus,
  AppState,
} from "react-native";
import ordersApi from "@/api/orders";
import { ThemeContext } from "@/context/themeContext";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { StatusBar } from "expo-status-bar";
import RenderBtn from "@/components/RenderBtn";
import Empty from "@/components/Empty";
import { OrderResponseType } from "@/utils/types";
import { useLocation } from "@/auth/locationContext";




const index = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const [isHomeScreen, setIsHomeScreen] = useState(true);

  const { currentLocation } = useLocation()

  const { data, isFetching, refetch, error } = useQuery({
    queryKey: ["packageOrders"],
    queryFn: ordersApi.getItemOrders,
    enabled: true,
    select: (data) => (data as { data: OrderResponseType[] })?.data?.filter((order: OrderResponseType) =>
      (order.order_status === 'pending' && order.order_type === 'delivery' && order.payment_status === 'paid')

    ),
  });

  const getDistance = (riderLat: number, riderLng: number, orderLat: number, orderLng: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (orderLat - riderLat) * (Math.PI / 180);
    const dLon = (orderLng - riderLng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(riderLat * (Math.PI / 180)) * Math.cos(orderLat * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };


  // const orders: OrderResponseType[] = data?.filter(order => {
  //   if (currentLocation) {
  //     const distance = getDistance(
  //       currentLocation.latitude,
  //       currentLocation?.longitude,
  //       Number(order?.origin_coords[0]),
  //       Number(order?.origin_coords[1])
  //     );
  //     return distance <= 100; // Within 100km
  //   }
  // });

  const orders = useMemo(() => {
    if (!data || !currentLocation) return [];

    return data.filter(order => {
      // Safely handle potential undefined or invalid coordinates
      const originLat = Number(order?.origin_coords[0]);
      const originLon = Number(order?.origin_coords[1]);

      // Additional validation
      if (isNaN(originLat) || isNaN(originLon)) return false;

      const distance = getDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        originLat,
        originLon
      );

      return distance <= 100;
    });
  }, [data, currentLocation]);





  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }


  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);



  useRefreshOnFocus(refetch);

  if (isFetching) {
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
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: activeColor.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 12,
            color: Colors.error,
            alignSelf: 'center'
          }}
        >
          Something went wrong!
        </Text>
      </View>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: activeColor.background }}>

      <StatusBar
        backgroundColor={activeColor.background}
        style={theme.mode === "dark" ? "light" : "dark"}
      />

      <FlatList
        data={orders || []}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) =>
          <OrderCard order={item} isHomeScreen={isHomeScreen} />
        }
        showsVerticalScrollIndicator={false}
        refreshing={isFetching}
        onRefresh={refetch}
        ListEmptyComponent={() => <Empty label="No orders yet!" />}

      />

    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
