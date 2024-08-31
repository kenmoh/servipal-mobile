import { ActivityIndicator, AppState, AppStateStatus, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FoodLaundryCard from '@/components/FoodLaundryCard';
import { StatusBar } from 'expo-status-bar';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/auth/authContext';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import { getLaundryServiceUsers } from '@/api/laundry';
import { usePathname } from 'expo-router';

const index = () => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [isHomeScreen, setIsHomeScreen] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');


    const { data: users, isLoading, isFetching, error } = useQuery({
        queryKey: ["users"],
        queryFn: getLaundryServiceUsers,
    });







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
    if (!users?.data) {
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
                data={users?.data}
                keyExtractor={(item) => item.id.toString()}
                key={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FoodLaundryCard item={item} isLaundry />
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