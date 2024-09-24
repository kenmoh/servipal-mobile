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
import React, { useContext, useEffect } from "react";
import { focusManager, useQuery } from "@tanstack/react-query";
import userApi from "@/api/users";
import RiderCard from "@/components/RiderCard";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/auth/authContext";
import { UserReturn } from "@/utils/types";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";

type RiderCardType = {
    id: string;
    image: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    completedOrder: number;
    pendingOrder: number;
};

const riders = () => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const {
        data: riders,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["riders", user?.id],
        queryFn: userApi.getDispatchRiders,
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

    return (
        <>
            <View style={{ flex: 1, backgroundColor: activeColor.background }}>
                <FlatList
                    data={riders?.data}
                    keyExtractor={(item: UserReturn) => item?.id?.toString()}
                    renderItem={({ item }) => <RiderCard rider={item} />}
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

export default riders;

const styles = StyleSheet.create({});
