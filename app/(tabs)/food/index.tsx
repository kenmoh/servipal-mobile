import { useContext, useEffect, useState } from "react";
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
import { router } from "expo-router";
import FloatingActionButton from "@/components/FloatingActionBtn";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodCard from "@/components/FoodCard";
import { getFoods } from "@/api/foods";
import { FoodType } from "@/utils/types";
import FoodLaundryCard from "@/components/FoodLaundryCard";
import items from "../buySell/items";

const restaurants = [
    {
        imageUrl:
            "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        address: "VI, Lagos",
        average_rating: 3,
        vendor_name: "MohEat",
        numReviews: 18
    },
    {
        imageUrl:
            "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=600",
        address: "Yaba, Lagos",
        average_rating: 4.6,
        vendor_name: "JaroKili",
        numReviews: 32
    },
    {
        imageUrl:
            "https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        address: "New Benin",
        average_rating: 4.2,
        vendor_name: "FoodMama",
        numReviews: 12
    },
    {
        imageUrl:
            "https://images.pexels.com/photos/64208/pexels-photo-64208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        address: "New Benin",
        average_rating: 4.2,
        vendor_name: "FoodMania",
        numReviews: 12
    },
    {
        imageUrl:
            "https://images.pexels.com/photos/2291603/pexels-photo-2291603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        address: "New Benin",
        average_rating: 4.2,
        vendor_name: "FoodCourt",
        numReviews: 12
    },
];

const index = () => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [isHomeScreen, setIsHomeScreen] = useState(true);
    const {
        data: foods,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: getFoods,
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
    if (!foods?.data) {
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
        <View
            style={[styles.container, { backgroundColor: activeColor.background }]}
        >
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item.vendor_name}
                key={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FoodLaundryCard
                        address={item.address}
                        imageUrl={item.imageUrl}
                        vendor_name={item.vendor_name}
                        average_rating={item.average_rating}
                        numReviews={(item.numReviews)}
                    />

                )}

            />
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flex: 1,
    },
});
