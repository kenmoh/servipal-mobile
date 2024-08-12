import { useContext, useEffect, useState } from "react";
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


const imageUrl =
    "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/fastfood.png";

const UserOrders = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();

    const {
        data: orders,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["foodOrders"],
        queryFn: ordersApi.getFoodOrders,
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
    if (!orders?.data) {
        <View
            style={{
                flex: 1,
                backgroundColor: activeColor.background,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>No Order yet</Text>
        </View>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: activeColor.background }}>
            <StatusBar
                backgroundColor={activeColor.background}
                style={theme.mode === "dark" ? "light" : "dark"}
            />
            <FlatList
                data={orders?.data}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => {
                    return item.vendor_username === user?.username ? (
                        <OrderCard order={item} image={imageUrl} />
                    ) : item.dispatch_company_name === user?.company_name ? (
                        <OrderCard order={item} image={imageUrl} />
                    ) : item.order_owner_username === user?.username ? (
                        <OrderCard order={item} image={imageUrl} />
                    ) : (
                        item.rider_phone_number === user?.phone_number &&
                        item.dispatch_company_name === user?.dispatch && (
                            <OrderCard order={item} image={imageUrl} isHomeScreen={false} />
                        )
                    );
                }}
                estimatedItemSize={200}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                vertical
                refreshing={isFetching}
                onRefresh={handleRefresch}
            />
        </View>
    );
};

export default UserOrders;

const styles = StyleSheet.create({});
