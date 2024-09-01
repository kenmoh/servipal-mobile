import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { focusManager, useQueries, useQuery } from "@tanstack/react-query";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Platform,
    AppStateStatus,
    AppState,
    Dimensions,
} from "react-native";
import { ThemeContext } from "@/context/themeContext";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useAuth } from "@/auth/authContext";

import { getCategories, getUserByMealCategory } from "@/api/foods";
import FoodLaundryCard from "@/components/FoodLaundryCard";
import CategoryBtn from "@/components/CategoryBtn";
import { StatusBar } from "expo-status-bar";
import { usePathname } from "expo-router";

type CategoryType = {
    name: string;
    id: number;
};
const index = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        "all"
    );

    const ref = useRef<FlatList<CategoryType>>(null);


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




    const handleCategoryPress = (category: CategoryType) => {
        setSelectedCategory(category.name);

        ref.current?.scrollToItem({
            animated: true,
            item: category,
            viewPosition: 0.5,
        });
    };




    const handleRefresch = () => refetch();


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
                ref={ref}
                data={categories?.data}
                keyExtractor={(item) => item?.id?.toString()}
                key={2}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                    <CategoryBtn
                        label={item?.name}
                        key={item.id}
                        isSelected={item.name === selectedCategory}
                        onPress={() => handleCategoryPress(item)}
                    />
                )}
            />

            <FlatList
                data={restaurants?.data}
                keyExtractor={(item) => item.id.toString()}
                key={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    const isLastItem = index === restaurants?.data.length - 1
                    return (
                        <FoodLaundryCard item={item} isLaundry={false} isLastItem={isLastItem} />
                    )
                }}
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
