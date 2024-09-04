import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import ReviewCard from '@/components/ReviewCard';
import { FontAwesome } from '@expo/vector-icons';
import Empty from '@/components/Empty';


const AddReviewBtn = ({ onPress }: { onPress: () => void }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                backgroundColor: 'teal',
                paddingVertical: 3,
                paddingHorizontal: 10,
                borderRadius: 100

            }}
        >
            <FontAwesome name="pencil-square-o" size={18} color={activeColor.text} />
            <Text style={{ fontFamily: "Poppins-Light", color: activeColor.text, fontSize: 12 }}>
                Add Review
            </Text>
        </TouchableOpacity>
    );
};

const reviews = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { seller, name, id } = useLocalSearchParams()
    return (
        <>
            <Stack.Screen options={{
                headerRight: () => <AddReviewBtn onPress={() => router.push({
                    pathname: `(p2p)/reviewForm`, params: {
                        seller, id, name
                    }
                })} />
            }} />



            {/* 
            <FlatList
                data={[]}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }: { item: ItemOrderType }) =>
                    (item.order_type === "food" && item.order_status === 'Pending' && item.payment_status === 'paid') &&
                    (< ReviewCard order={item} isHomeScreen={true} />)


                }
                estimatedItemSize={200}
                showsVerticalScrollIndicator={false}
                vertical
                // refreshing={refreshing}
                // onRefresh={handleRefretch}
                ListEmptyComponent={() => <Empty />}
            /> */}
        </>
    )
}

export default reviews

const styles = StyleSheet.create({})