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
import Empty from "@/components/Empty";
import { showMessage } from "react-native-flash-message";
import { OrderResponseType } from "@/utils/types";

const index = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];


    const { data, isFetching, refetch, error } = useQuery({
        queryKey: ["laundryOrders"],
        queryFn: ordersApi.getLaundryNewLaundryOrder,
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



    useRefreshOnFocus(refetch!);

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
        showMessage({
            message: 'Something went wrong!',
            type: 'danger',

        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: activeColor.background }}>
            <StatusBar
                backgroundColor={activeColor.background}
                style={theme.mode === "dark" ? "light" : "dark"}
            />

            <FlatList
                data={data?.data}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }: { item: OrderResponseType }) =>
                    <OrderCard order={item} isHomeScreen={true} />
                }
                estimatedItemSize={200}
                showsVerticalScrollIndicator={false}
                vertical
                refreshing={isFetching}
                onRefresh={refetch}
                ListEmptyComponent={() => <Empty label="No orders yet!" />}
            />
        </View>
    );
};

export default index;

const styles = StyleSheet.create({});
