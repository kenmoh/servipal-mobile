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
import { useAuth } from "@/auth/authContext";
import { StatusBar } from "expo-status-bar";
import CategoryBtn from "@/components/CategoryBtn";
import RenderBtn from "@/components/RenderBtn";
import { Link } from "expo-router";

const EmptyOrder = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
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
          fontFamily: "Poppins-Bold",
          fontSize: 16,
          color: activeColor.text,
          alignSelf: 'center'
        }}
      >
        No Order yet
      </Text>
    </View>
  )
}

const index = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const [isHomeScreen, setIsHomeScreen] = useState(true);
  const [activeOrderType, setActiveOrderType] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const packageOrdersQuery = useQuery({
    queryKey: ["packageOrders"],
    queryFn: ordersApi.getItemOrders,
    enabled: false,
  });

  const foodOrdersQuery = useQuery({
    queryKey: ["foodOrders"],
    queryFn: ordersApi.getFoodOrders,
    enabled: false,
  });

  const laundryOrdersQuery = useQuery({
    queryKey: ["laundryOrders"],
    queryFn: ordersApi.getLaundryOrders,
    enabled: false,
  });

  const handleFetchOrders = useCallback(
    (orderType: string) => {
      setActiveOrderType(orderType);
      switch (orderType) {
        case "package":
          packageOrdersQuery.refetch();
          break;
        case "food":
          foodOrdersQuery.refetch();
          break;
        case "laundry":
          laundryOrdersQuery.refetch();
          break;
      }
    },
    [packageOrdersQuery, foodOrdersQuery, laundryOrdersQuery]
  );

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }
  const getActiveQuery = () => {
    switch (activeOrderType) {
      case "package":
        return packageOrdersQuery;
      case "food":
        return foodOrdersQuery;
      case "laundry":
        return laundryOrdersQuery;
      default:
        return null;
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    handleFetchOrders("package");
  }, []);

  const activeQuery = getActiveQuery();

  const handleRefretch = () => {
    setRefreshing(true);
    activeQuery?.refetch();
    setRefreshing(false);
  };

  useRefreshOnFocus(activeQuery?.refetch!);

  if (
    packageOrdersQuery.isFetching ||
    foodOrdersQuery.isFetching ||
    laundryOrdersQuery.isFetching
  ) {
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
  if (
    packageOrdersQuery.error ||
    foodOrdersQuery.error ||
    laundryOrdersQuery.error
  ) {
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
    </View>;
  }
  // if (
  //   !packageOrdersQuery?.data?.data ||
  //   !foodOrdersQuery?.data?.data ||
  //   !laundryOrdersQuery?.data?.data
  // ) {
  //   <View
  //     style={{
  //       flex: 1,
  //       backgroundColor: activeColor.background,
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}
  //   >
  //     <Text
  //       style={{
  //         fontFamily: "Poppins-Bold",
  //         fontSize: 16,
  //         color: activeColor.icon,
  //         alignSelf: 'center'
  //       }}
  //     >
  //       No Order yet
  //     </Text>
  //   </View>;
  // }

  return (
    <View style={{ flex: 1, backgroundColor: activeColor.background }}>

      <StatusBar
        backgroundColor={activeColor.background}
        style={theme.mode === "dark" ? "light" : "dark"}
      />
      <View style={{ flexDirection: "row" }}>
        <RenderBtn
          title="Package"
          orderType="package"
          isActive={activeOrderType === "package"}
          onPress={handleFetchOrders}
        />
        <RenderBtn
          title="Food"
          orderType="food"
          isActive={activeOrderType === "food"}
          onPress={handleFetchOrders}
        />
        <RenderBtn
          title="Laundry"
          orderType="laundry"
          isActive={activeOrderType === "laundry"}
          onPress={handleFetchOrders}
        />
      </View>

      <FlatList
        data={activeQuery?.data?.data}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) =>
          item.order_status === "Pending" &&
          item.payment_status === "paid" && (
            <OrderCard order={item} isHomeScreen={isHomeScreen} />
          )
        }
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        vertical
        refreshing={refreshing}
        onRefresh={handleRefretch}
        ListEmptyComponent={() => <EmptyOrder />}
      />

    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
