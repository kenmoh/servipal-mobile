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
import Empty from "@/components/Empty";
import { ItemOrderType } from "@/utils/types";

export const imageUrl = "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/fastfood.png"

const Delivery = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [isHomeScreen, setIsHomeScreen] = useState(true);
    const [activeOrderType, setActiveOrderType] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth()


    const newFoodOrdersQuery = useQuery({
        queryKey: ["laundryOrders"],
        queryFn: ordersApi.getVendorNewFoodOrder,
        enabled: false,
    });

    const handleFetchOrders = useCallback(
        (orderType: string) => {
            setActiveOrderType(orderType);
            newFoodOrdersQuery.refetch();
        },
        [newFoodOrdersQuery]
    );

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
        handleFetchOrders("package");
    }, []);



    const handleRefretch = () => {
        setRefreshing(true);
        newFoodOrdersQuery.refetch()
        setRefreshing(false);
    };

    useRefreshOnFocus(newFoodOrdersQuery?.refetch!);

    if (

        newFoodOrdersQuery.isFetching
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

        newFoodOrdersQuery.error
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

    return (
        <View style={{ flex: 1, backgroundColor: activeColor.background }}>

            <StatusBar
                backgroundColor={activeColor.background}
                style={theme.mode === "dark" ? "light" : "dark"}
            />

            <FlatList
                data={newFoodOrdersQuery?.data?.data}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }: { item: ItemOrderType }) =>
                    (item.order_type === "food" && item.order_status === 'Pending' && item.payment_status === 'paid') &&
                    (<OrderCard order={item} isHomeScreen={true} />)


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

export default Delivery;

const styles = StyleSheet.create({});
