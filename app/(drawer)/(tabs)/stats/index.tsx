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
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { StatusBar } from "expo-status-bar";
import RenderBtn from "@/components/RenderBtn";
import OrderCard from "@/components/OrderCard";

const index = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();

    const [activeOrderType, setActiveOrderType] = useState<string | null>(null);

    const {
        data: order,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: ordersApi.getItemOrders,
    });

    const packageOrdersQuery = useQuery({
        queryKey: ["packageOrders"],
        queryFn: ordersApi.getItemOrders,
        enabled: false,
    });


    const foodOrdersQuery = useQuery({
        queryKey: ["foodOrders"],
        queryFn: ordersApi.getFoodOrders,
        enabled: false,
    });

    const laundryOrdersQuery = useQuery({
        queryKey: ["laundryOrders"],
        queryFn: ordersApi.getLaundryOrders,
        enabled: false,
    });


    const handleFetchOrders = useCallback(
        (orderType: string) => {
            setActiveOrderType(orderType);
            switch (orderType) {
                case "package":
                    packageOrdersQuery.refetch();
                    break;
                case "food":
                    foodOrdersQuery.refetch();
                    break;
                case "laundry":
                    laundryOrdersQuery.refetch();
                    break;
            }
        },
        [packageOrdersQuery, foodOrdersQuery, laundryOrdersQuery]
    );

    function onAppStateChange(status: AppStateStatus) {
        if (Platform.OS !== "web") {
            focusManager.setFocused(status === "active");
        }
    }
    const getActiveQuery = () => {
        switch (activeOrderType) {
            case "package":
                return packageOrdersQuery;
            case "food":
                return foodOrdersQuery;
            case "laundry":
                return laundryOrdersQuery;
            default:
                return null;
        }
    };

    useEffect(() => {
        const subscription = AppState.addEventListener("change", onAppStateChange);

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        handleFetchOrders("package");
    }, []);

    const handleRefresch = () => refetch();

    useRefreshOnFocus(refetch);

    const activeQuery = getActiveQuery();

    if (packageOrdersQuery.isFetching || foodOrdersQuery.isFetching || laundryOrdersQuery.isFetching) {
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
    if (packageOrdersQuery.error || foodOrdersQuery.error || laundryOrdersQuery.error) {
        <View
            style={{
                flex: 1,
                backgroundColor: activeColor.background,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12, color: Colors.error }}>Something went wrong!</Text>
        </View>;
    }
    if (activeQuery?.data?.data) {
        <View
            style={{
                flex: 1,
                backgroundColor: activeColor.background,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: activeColor.icon }}>No Order yet</Text>
        </View>;
    }


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
                            styles.statContainer,
                            { backgroundColor: activeColor.profileCard },
                        ]}
                    >
                        <Text style={[styles.number, { color: activeColor.text }]}>30</Text>
                        <Text style={[styles.text, { color: activeColor.icon }]}>
                            Total Deliveries
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.statContainer,
                            { backgroundColor: activeColor.profileCard },
                        ]}
                    >
                        <Text style={[styles.number, { color: activeColor.text }]}>4</Text>
                        <Text style={[styles.text, { color: activeColor.icon }]}>
                            Pending Deliveries
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <RenderBtn
                        title="Package"
                        orderType="package"
                        isActive={activeOrderType === "package"}
                        onPress={handleFetchOrders}
                    />
                    <RenderBtn
                        title="Food"
                        orderType="food"
                        isActive={activeOrderType === "food"}
                        onPress={handleFetchOrders}
                    />
                    <RenderBtn
                        title="Laundry"
                        orderType="laundry"
                        isActive={activeOrderType === "laundry"}
                        onPress={handleFetchOrders}
                    />
                </View>
                <FlatList
                    data={activeQuery?.data?.data}
                    keyExtractor={(item) => item?.id}
                    renderItem={({ item }) =>
                        (item?.vendor_phone_number === user?.phone_number && user?.user_type === 'vendor') ? (
                            <OrderCard order={item} isHomeScreen={false} />
                        ) : (item?.dispatch_company_name === user?.company_name && user?.user_type === 'dispatcher') ? (
                            <OrderCard order={item} isHomeScreen={false} />
                        ) : (
                            (item?.rider_phone_number === user?.phone_number && user?.user_type === 'rider') && (
                                <OrderCard order={item} isHomeScreen={false} />
                            )
                        )
                    }
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    vertical
                    refreshing={isFetching}
                    onRefresh={handleRefresch}
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
        marginVertical: SIZES.marginSmall,
        gap: 20,
        width: "95%",
        alignSelf: "center",
    },
    text: {
        fontFamily: "Poppins-Light",
        fontSize: 12,
    },
    number: {
        fontFamily: "Poppins-Bold",
        fontSize: 20,
    },
    statContainer: {
        paddingVertical: SIZES.paddingSmall,
        paddingHorizontal: SIZES.paddingMedium,
        borderRadius: SIZES.smallRadius,
    },
});
