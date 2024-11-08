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
import Empty from "@/components/Empty";

const laundry = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [isHomeScreen, setIsHomeScreen] = useState(true);
    const {
        data,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["laundryOrders"],
        queryFn: ordersApi.getLaundryOrders,
        select: (data) => data?.data?.filter((order: any) =>
            (order.order_status === 'pending' && order.payment_status === 'paid' && order.order_type === 'laundry')

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
    if (!data) {
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
                data={data}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => (<OrderCard order={item} isHomeScreen={isHomeScreen} />)
                }
                estimatedItemSize={200}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                vertical
                refreshing={isFetching}
                onRefresh={handleRefresch}
                ListEmptyComponent={() => <Empty />}
            />
        </View>
    );
};

export default laundry;

const styles = StyleSheet.create({});
