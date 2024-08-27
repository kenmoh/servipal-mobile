import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import SellCard from '@/components/SellCard'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { getItemListings } from '@/api/items';



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
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    gap: 20,

                }}
                columnWrapperStyle={{ gap: 10 }}
                renderItem={({ item }) => (<SellCard item={item} />)}
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