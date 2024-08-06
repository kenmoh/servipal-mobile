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
    ScrollView,
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
import { getCategories, getFoods, getUserByMealCategory } from "@/api/foods";
import { FoodType } from "@/utils/types";
import FoodLaundryCard, { CardProps } from "@/components/FoodLaundryCard";
import items from "../buySell/items";
import CategoryBtn from "@/components/CategoryBtn";
import { StatusBar } from "expo-status-bar";

type CategoryType = {
    name: string;
    id: number;
};
const index = () => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [isHomeScreen, setIsHomeScreen] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");

    const { data: categories, isSuccess: categorySuccess } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    const {
        data: restaurants,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["usersByMeal", "selectedCategory"],
        queryFn: () => getUserByMealCategory(selectedCategory),
        enabled: categorySuccess,
    });

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
    };

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
    if (!restaurants?.data) {
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
            <StatusBar
                backgroundColor={activeColor.background}
                style={theme.mode === "dark" ? "light" : "dark"}
            />
            <FlatList
                data={restaurants?.data}
                keyExtractor={(item) => item.id.toString()}
                key={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <FoodLaundryCard item={item} />}
            />
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        flex: 1,
    },
});
