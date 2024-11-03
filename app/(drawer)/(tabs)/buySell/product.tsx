import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import SellCard from '@/components/SellCard';
import Empty from '@/components/Empty';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { getSelletListings } from '@/api/items';
import { useAuth } from '@/auth/authContext';
import { useQuery } from '@tanstack/react-query';
import TransactionDetail from '@/components/TransactionDetail';
import ProductCard from '@/components/ProductCard';

const items = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()


    const { data, refetch, isFetching, isLoading, isPending, error } = useQuery({
        queryKey: ['userListins', user?.id],
        queryFn: getSelletListings
    })

    console.log('=============================xxxx', data, '===============xxxxxxxxxxxxxxxxxxxx==============')

    const handleRefresch = () => refetch();

    useRefreshOnFocus(refetch);

    if (isPending) {
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

        <View style={{ flex: 1, backgroundColor: activeColor.background }}>
            <View style={{ marginTop: 5 }} />
            <FlatList
                data={data}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item, index }) => {
                    const isLastItem = index === data?.length! - 1;
                    return (
                        <ProductCard isLastItem={isLastItem} item={item} />
                    );
                }}
                showsVerticalScrollIndicator={false}
                refreshing={isFetching}
                onRefresh={handleRefresch}
                ListEmptyComponent={<Empty label='You have not created any product.' />}
            />
        </View>

    )
}

export default items

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})