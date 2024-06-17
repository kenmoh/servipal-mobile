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


const index = () => {
  const { user } = useAuth()
  const { theme } = useContext(ThemeContext);
  const [isHomeScreen, setIsHomeScreen] = useState(true)
  let activeColor = Colors[theme.mode];
  const {
    data: order,
    error,
    isLoading,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getListings,
  });


  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active')
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [])


  const handleRefresch = () => refetch()

  useRefreshOnFocus(refetch)




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
          refreshing={isFetching}
          onRefresh={handleRefresch}


        />

      </View>
      {/* <Link href='/order/payment' style={{ fontSize: 40 }}>Payment</Link> */}
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
