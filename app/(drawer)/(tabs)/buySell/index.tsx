import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import SellCard, { CardType } from '@/components/SellCard'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { getItemListings } from '@/api/items';
import Empty from '@/components/Empty';



const index = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { data, isFetching, refetch } = useQuery({
        queryKey: ['listings'],
        queryFn: getItemListings
    })


    return (
        <View style={[styles.container, { backgroundColor: activeColor.background }]}>
            <View style={{ marginVertical: 10 }} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data?.data}
                keyExtractor={(item: CardType, index: number) => `${item?.id?.toString()}-${index}`}

                contentContainerStyle={{
                    alignSelf: 'center',


                }}
                numColumns={2}
                columnWrapperStyle={{ gap: 10 }}
                ListEmptyComponent={!isFetching && <Empty label='No item yet!' />}
                renderItem={({ item, index }) => {
                    const isLastItem = index === data?.data.length - 1
                    return (
                        <SellCard item={item} isLastItem={isLastItem} />
                    )
                }}
                onRefresh={refetch}
                refreshing={isFetching}
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})