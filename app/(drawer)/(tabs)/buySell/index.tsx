import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import SellCard from '@/components/SellCard'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { getItemListings } from '@/api/items';
import Empty from '@/components/Empty';



const index = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { data } = useQuery({
        queryKey: ['listings'],
        queryFn: getItemListings
    })


    return (
        <View style={[styles.container, { backgroundColor: activeColor.background }]}>
            <View style={{ marginVertical: 10 }} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data?.data}
                keyExtractor={(item) => item?.id?.toString()}
                numColumns={2}
                contentContainerStyle={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    gap: 15,

                }}
                columnWrapperStyle={{ gap: 10 }}
                ListEmptyComponent={<Empty />}
                renderItem={({ item, index }) => {
                    const isLastItem = index === data?.data.length - 1
                    return (
                        <SellCard item={item} isLastItem={isLastItem} />
                    )
                }}
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