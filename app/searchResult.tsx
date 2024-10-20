import { FlatList, StyleSheet, View } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React, { useContext } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { SIZES } from '@/constants/Sizes';
import { OrderResponseType } from '@/utils/types';
import OrderCard from '@/components/OrderCard';
import Empty from '@/components/Empty';

const searchResult = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { searchResult } = useLocalSearchParams()


    return (
        <>
            <StatusBar
                backgroundColor={activeColor.background}
                style={theme.mode === "dark" ? "light" : "dark"}
            />
            <View
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >



                <FlatList
                    data={JSON.parse(searchResult)}
                    keyExtractor={(item, index) => `${item?.id?.toString()}-${index}`}
                    renderItem={({ item }: { item: OrderResponseType }) => <OrderCard order={item} isHomeScreen={false} />}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    vertical
                    ListEmptyComponent={<Empty label='No Result' />}

                />
            </View>
        </>
    );
}

export default searchResult

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    statWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: SIZES.marginLarge,
        gap: 20,
        width: "95%",
        alignSelf: "center",
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
    },
    number: {
        fontFamily: "Poppins-Bold",
        fontSize: 16,
    },
    statContainer: {
        flexDirection: "row",
        gap: 5,
    },
});