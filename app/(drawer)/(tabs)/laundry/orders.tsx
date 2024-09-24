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
import { ItemOrderType } from "@/utils/types";
import Empty from "@/components/Empty";

const index = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    // const [isHomeScreen, setIsHomeScreen] = useState(true);
    const [activeOrderType, setActiveOrderType] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();

    const laundryOrdersQuery = useQuery({
        queryKey: ["laundryOrders"],
        queryFn: ordersApi.getVendorNewLaundryOrder,
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



    const handleRefretch = () => {
        setRefreshing(true);
        laundryOrdersQuery.refetch();
        setRefreshing(false);
    };

    useRefreshOnFocus(laundryOrdersQuery?.refetch!);

    if (laundryOrdersQuery.isFetching) {
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
    if (laundryOrdersQuery.error) {
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
                    alignSelf: "center",
                }}
            >
                Something went wrong!
            </Text>
        </View>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: activeColor.background }}>
            <StatusBar
                backgroundColor={activeColor.background}
                style={theme.mode === "dark" ? "light" : "dark"}
            />

            <FlatList
                data={laundryOrdersQuery?.data?.data}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }: { item: ItemOrderType }) =>
                    item.order_type === "laundry" &&
                    item.order_status === "Pending" &&
                    item.payment_status === "paid" && (
                        <OrderCard order={item} isHomeScreen={true} />
                    )
                }
                estimatedItemSize={200}
                showsVerticalScrollIndicator={false}
                vertical
                refreshing={refreshing}
                onRefresh={handleRefretch}
                ListEmptyComponent={() => <Empty />}
            />
        </View>
    );
};

export default index;

const styles = StyleSheet.create({});
