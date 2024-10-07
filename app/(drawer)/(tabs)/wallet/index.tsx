import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import WalletCard from "@/components/WalletCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { focusManager, useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/auth/authContext";
import walletApi from "@/api/wallet";
import TransactionCard from "@/components/TransactionCard";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { SIZES } from "@/constants/Sizes";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import { TransactionData } from "@/utils/types";

const wallet = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { user } = useAuth();

  const { data, error, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["userWallet", user?.id],
    queryFn: walletApi.getUserWallet,
    enabled: !!user?.id,

  });



  const {
    mutate,
    isPending,
    data: wallet,

  } = useMutation({
    mutationFn: walletApi.withdrawFunds,
    onError: (error) => showMessage({
      message: error.message,
      type: "danger",
      style: {
        alignItems: "center",
      },
    }),
    onSuccess: () => showMessage({
      message: "Withrawal Successful!",
      type: "success",
      style: {
        alignItems: "center",
      },
    })
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

  if (isPending || isLoading) {
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
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />

      <WalletCard onPress={mutate} wallet={data} user={user!} />

      <View
        style={[styles.container, { backgroundColor: activeColor.background }]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: SIZES.marginSmall,
            paddingHorizontal: SIZES.paddingSmall,
          }}
        >
          <Text
            style={{
              color: activeColor.text,
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              letterSpacing: 2.5,
            }}
          >
            Transactions
          </Text>

          {user?.user_type === 'Regular User' && <Text
            onPress={() => router.push('/(tabs)/wallet/failedTranx')}
            style={{
              color: activeColor.text,
              fontFamily: "Poppins-Light",
              fontSize: 12,
              textDecorationLine: 'underline',
              marginTop: 10,
            }}
          >
            Top-up Transactions
          </Text>}
        </View>
        <FlatList
          data={data?.wallet_transactions}
          keyExtractor={(item, index) => `${item?.id?.toString()}-${index}`}
          renderItem={({ item, index }: { item: TransactionData, index: number }) => {
            const isLastTranx = index === data?.data?.wallet_transactions.length - 1;
            return (
              <TransactionCard transactions={item} isLastTranx={isLastTranx} />
            );
          }}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={handleRefresch}
        />
      </View>
    </>
  );
};

export default wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.paddingSmall,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
  },
});
