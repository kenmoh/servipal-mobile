import { useContext, useEffect, useRef, useState } from "react";
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
import { ThemeContext } from "@/context/themeContext";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useAuth } from "@/auth/authContext";

import { getCategories, getFoods, getUserByMealCategory } from "@/api/foods";
import FoodLaundryCard, { CardProps } from "@/components/FoodLaundryCard";
import CategoryBtn from "@/components/CategoryBtn";
import { StatusBar } from "expo-status-bar";

type CategoryType = {
    name: string;
    id: number;
};
const index = () => {

    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [selectedCategory, setSelectedCategory] = useState<string | null>('pasta');
    const categoryScrollViewRef = useRef<ScrollView>(null);
    const [buttonWidths, setButtonWidths] = useState<number[]>([]);

    const { data: categories } = useQuery({
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
        queryKey: ["usersByMeal", selectedCategory],
        queryFn: () => getUserByMealCategory(selectedCategory),
        enabled: !!selectedCategory,
    });



    const handleCategoryPress = (category: CategoryType, index: number) => {
        const xOffset = buttonWidths.slice(0, index).reduce((total, width) => total + width, 0);
        setSelectedCategory(category.name);
        categoryScrollViewRef?.current?.scrollTo({ x: xOffset, animated: true })

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
            <ScrollView ref={categoryScrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
                {categories?.data?.map((category: CategoryType, index: number) => (
                    <CategoryBtn
                        label={category?.name}
                        key={category.id}
                        isSelected={category.name === selectedCategory}
                        onPress={() => handleCategoryPress(category, index)}
                    />
                ))}
            </ScrollView>
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
