import {
    ActivityIndicator,
    AppState,
    AppStateStatus,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { focusManager, useQuery } from "@tanstack/react-query";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/auth/authContext";
import { SIZES } from "@/constants/Sizes";
import ordersApi from "@/api/orders";
import { StatusBar } from "expo-status-bar";
import OrderCard from "@/components/OrderCard";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { OrderResponseType } from "@/utils/types";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";



const index = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();

    const [refreshing, setRefreshing] = useState(false);

    const { data, refetch, isFetching } = useQuery({
        queryKey: ["package", user?.id],
        queryFn: ordersApi.getUserOrderItems,
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
        refetch();
        setRefreshing(false);
    };

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
                <View style={[styles.statWrapper]}>
                    <View
                        style={[
                            styles.statContainer
                        ]}
                    >
                        <Feather name="package" color={activeColor.icon} size={18} />
                        <Text style={[styles.text, { color: activeColor.text }]}>
                            All: {data?.data?.total_order}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.statContainer
                        ]}
                    >
                        <MaterialIcons name="pending" color={activeColor.icon} size={18} />
                        <Text style={[styles.text, { color: activeColor.text }]}>
                            Pending: {data?.data?.pending_orders}
                        </Text>
                    </View>
                </View>


                <FlatList
                    data={data}
                    keyExtractor={(item) => item?.id}
                    renderItem={({ item }: { item: OrderResponseType }) => <OrderCard order={item} isHomeScreen={false} />}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    vertical
                    refreshing={isFetching}
                    onRefresh={handleRefretch}
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
