import { ActivityIndicator, AppState, AppStateStatus, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FoodLaundryCard from '@/components/FoodLaundryCard';
import { StatusBar } from 'expo-status-bar';
import { focusManager, useQuery } from '@tanstack/react-query';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { getCategories, getUserByMealCategory } from '@/api/foods';
import { useAuth } from '@/auth/authContext';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';

const index = () => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [isHomeScreen, setIsHomeScreen] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');

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
                style={theme.mode === 'dark' ? 'light' : 'dark'}
            />
            <FlatList
                data={restaurants?.data}
                keyExtractor={(item) => item.id.toString()}
                key={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FoodLaundryCard item={item} />
                )}
            />
        </View>
    );
}

export default index

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        flex: 1,
    },
});
