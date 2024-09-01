import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import walletApi from '@/api/wallet'
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/auth/authContext';
import TransactionCard from '@/components/TransactionCard';
import FundCard from '@/components/FundCard';

const failedTranx = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()


    const { data } = useQuery({
        queryKey: ['funds', user?.id],
        queryFn: walletApi.getUserTopUps
    })

    return (

        <View style={{ flex: 1, backgroundColor: activeColor.background }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item, index }) => {
                    const isLastItem = index === data?.length - 1;
                    return (
                        // <TransactionCard transaction={item} />
                        <FundCard isLastItem={isLastItem} item={item} />
                    );
                }}
                showsVerticalScrollIndicator={false}
            // refreshing={isFetching}
            // onRefresh={handleRefresch}
            // stickyHeaderIndices={[0]}
            />
        </View>

    )
}

export default failedTranx

const styles = StyleSheet.create({})