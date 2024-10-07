import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import walletApi from '@/api/wallet'
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/auth/authContext';
import TransactionCard from '@/components/TransactionCard';
import FundCard from '@/components/FundCard';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import Empty from '@/components/Empty';

const failedTranx = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()


    const { data, refetch, isFetching, isLoading, isPending, error } = useQuery({
        queryKey: ['funds', user?.id],
        queryFn: walletApi.getUserTopUps
    })

    console.log(data)

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
                    const isLastItem = index === data?.length - 1;
                    return (
                        <FundCard isLastItem={isLastItem} item={item} />
                    );
                }}
                showsVerticalScrollIndicator={false}
                refreshing={isFetching}
                onRefresh={handleRefresch}
                ListEmptyComponent={<Empty label='No transactions!' />}
            />
        </View>

    )
}

export default failedTranx

const styles = StyleSheet.create({})