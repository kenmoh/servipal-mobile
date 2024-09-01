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

const wallet = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { user } = useAuth();

  const { data, error, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["wallet", user?.id],
    queryFn: walletApi.getUserWallet,
  });

  const {
    isSuccess: fundSuccess,
    mutate,
    isPending,
    data: wallet,
    error: fundError,
  } = useMutation({
    mutationFn: walletApi.withdrawFunds,
  });

  console.log(wallet)

  const walletData = data?.data?.transactions;

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (fundError) {
      showMessage({
        message: fundError.message,
        type: "danger",
        style: {
          alignItems: "center",
        },
      });
    }
    if (fundSuccess) {
      showMessage({
        message: "Withrawal Successful!",
        type: "success",
        style: {
          alignItems: "center",
        },
      });
    }
  }, [fundError, fundSuccess]);

  const handleRefresch = () => refetch();

  useRefreshOnFocus(refetch);

  if (isPending) {
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

      <WalletCard onPress={mutate} wallet={data?.data} user={user!} />

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

          {user?.user_type === 'vendor' && <Text
            onPress={() => router.push('/(tabs)/wallet/failedTranx')}
            style={{
              color: activeColor.text,
              fontFamily: "Poppins-Light",
              fontSize: 12,

              marginTop: 10,
            }}
          >
            Top-up Transactions
          </Text>}
        </View>
        <FlatList
          data={walletData}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item, index }) => {
            const isLastTranx = index === walletData.length - 1;
            return (
              <TransactionCard transaction={item} isLastTranx={isLastTranx} />
            );
          }}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={handleRefresch}
          stickyHeaderIndices={[0]}
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
