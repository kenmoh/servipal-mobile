import { useContext, useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";
import { Colors } from "@/constants/Colors";
import { focusManager, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
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
import { OrderResponseType } from "@/utils/types";
import AppSwipeable from "@/components/AppSwipeable";

export const imageUrl =
    "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/fastfood.png";

const Delivery = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();

    const { data, refetch, error, isFetching } = useQuery({
        queryKey: ["newFoodOrders"],
        queryFn: ordersApi.getUserNewFoodOrder,
    });

    const { isPending, mutate } = useMutation({
        mutationFn: (orderId: string) => ordersApi.updateFoodStatus(orderId)
    })

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
        refetch();
        setRefreshing(false);
    };

    useRefreshOnFocus(refetch!);

    if (isFetching || isPending) {
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
                data={data?.data}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }: { item: OrderResponseType }) => (
                    <AppSwipeable onPress={() => mutate(item.id)} orderId={item.id}>
                        <OrderCard order={item} isHomeScreen={true} />
                    </AppSwipeable>
                )}
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
