import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import NotificationCard from '@/components/NotificationCard'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { SIZES } from '@/constants/Sizes';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/auth/authContext';
import orderApi from '@/api/orders'
import { UserDisputes } from '@/utils/types';
import Empty from '@/components/Empty';

const disputeNotification = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()

    const { data, refetch, isFetching } = useQuery({
        queryKey: ['notification', user?.id],
        queryFn: orderApi.getUserDisputes
    })

    return (
        <FlatList
            keyExtractor={(item, index) => `${item?.id?.toString()}-${index}`}
            showsVerticalScrollIndicator={false}
            data={data ?? []}
            ListEmptyComponent={<Empty label="No Disoute. Keeping it clean!" />}
            onRefresh={refetch}
            refreshing={isFetching}
            renderItem={({ item }: { item: UserDisputes }) => <NotificationCard item={item} notificationId={item?.id} />}
        />
    )
}

export default disputeNotification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.paddingMedium
    }
})