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
import React, { useContext, useEffect, useState } from "react";
import { focusManager, keepPreviousData, useQuery } from "@tanstack/react-query";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/auth/authContext";
import { SIZES } from "@/constants/Sizes";
import ordersApi from "@/api/orders";
import { StatusBar } from "expo-status-bar";
import OrderCard from "@/components/OrderCard";
import { OrderResponseType } from "@/utils/types";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import CustomBtn from "@/components/CustomBtn";


const food = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();
    const pageSize = 100
    const [pageNumber, setPageNumber] = useState(1);

    const { data, refetch, isFetching, } = useQuery({
        queryKey: ["food", user?.id, pageNumber, pageSize],
        queryFn: () => ordersApi.getUserRestaurantOrderItems(pageSize, pageNumber),
        placeholderData: keepPreviousData,
    });

    function onAppStateChange(status: AppStateStatus) {
        if (Platform.OS !== "web") {
            focusManager.setFocused(status === "active");
        }
    }

    // Load More function
    const loadMoreItems = () => {
        setPageNumber(prev => prev + 1); // Increment page number
    };


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
                    keyExtractor={(item) => item?.id + item.image_url}
                    renderItem={({ item }: { item: OrderResponseType }) => <OrderCard order={item} isHomeScreen={false} />}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    vertical
                    refreshing={isFetching}
                    onRefresh={refetch}
                />
                {/* <CustomBtn btnColor="red" label="Load More" onPress={loadMoreItems} /> */}
            </View>
        </>
    );
};

export default food;

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
        fontSize: 14,
    },
    statContainer: {
        flexDirection: "row",
        gap: 5,
    },
});
