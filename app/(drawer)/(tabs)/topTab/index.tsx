import { useCallback, useContext, useEffect, useState } from "react";
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




const index = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const [isHomeScreen, setIsHomeScreen] = useState(true);


  const { data, isFetching, refetch, error } = useQuery({
    queryKey: ["packageOrders"],
    queryFn: ordersApi.getItemOrders,
    enabled: true,
    select: (data) => data?.data?.filter((order: OrderResponseType) =>
      (order.order_status === 'pending' && order.order_type === 'delivery' && order.payment_status === 'paid')

    ),
  });


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
        data={data || []}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) =>
          <OrderCard order={item} isHomeScreen={isHomeScreen} />
        }
        estimatedItemSize={300}
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
