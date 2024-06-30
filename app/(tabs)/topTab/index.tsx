import { useContext, useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";
import { Colors, themeMode } from "@/constants/Colors";
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
import { router } from "expo-router";
import FloatingActionButton from "@/components/FloatingActionBtn";
import { AntDesign } from "@expo/vector-icons";

const index = () => {
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const [isHomeScreen, setIsHomeScreen] = useState(true);
  const {
    data: order,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getListings,
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

  const handleRefresch = () => refetch();

  useRefreshOnFocus(refetch);

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
          renderItem={({ item, index }) => {
            const isLastOrder = index === order?.data.length - 1
            return (item.order_status === "Pending" &&
              item.payment_status === "paid" && (
                <OrderCard order={item} isHomeScreen={isHomeScreen} isLastOrder={isLastOrder} />
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
        {
          user?.user_type === 'vendor' &&
          <View style={{
            position: "absolute",
            bottom: 30,
            right: 10,
          }}>

            <FloatingActionButton
              icon={<AntDesign name="pluscircleo" color={"#fff"} size={30} />}
              onPress={() => router.push("/(order)/createOrder")}
            />
          </View>
        }
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
