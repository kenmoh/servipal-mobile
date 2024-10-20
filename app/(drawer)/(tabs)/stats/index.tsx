import {

    AppState,
    AppStateStatus,
    FlatList,
    Platform,
    StyleSheet,

    View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { focusManager, useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { usePathname } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/auth/authContext";
import { SIZES } from "@/constants/Sizes";
import ordersApi from "@/api/orders";
import OrderCard from "@/components/OrderCard";
import { OrderResponseType } from "@/utils/types";



const index = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();
    const pathname = usePathname();
    const orderType = pathname === "/stats" ? "delivery" : pathname === "/stats/food" ? "food" : 'laundry';

    const { data, refetch, isFetching } = useQuery({
        queryKey: ["orders", user?.id, orderType],
        queryFn: ordersApi.getUserOrderItems

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


    useRefreshOnFocus(refetch);


    return (
        <>
            <StatusBar
                backgroundColor={activeColor.background}
                style={theme.mode === "dark" ? "light" : "dark"}
            />
            <View
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >



                <FlatList
                    data={data}
                    keyExtractor={(item) => item?.id}
                    renderItem={({ item }: { item: OrderResponseType }) => <OrderCard order={item} isHomeScreen={false} />}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    vertical
                    refreshing={isFetching}
                    onRefresh={refetch}
                />
            </View>
        </>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    statWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: SIZES.marginLarge,
        gap: 20,
        width: "95%",
        alignSelf: "center",
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
    },
    number: {
        fontFamily: "Poppins-Bold",
        fontSize: 16,
    },
    statContainer: {
        flexDirection: "row",
        gap: 5,
    },
});
