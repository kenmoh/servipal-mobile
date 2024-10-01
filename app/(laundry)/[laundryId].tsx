import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ViewCartBtn from '@/components/ViewCartBtn';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { getUserLaundryServices } from '@/api/laundry';
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { useCart } from '@/components/CartProvider';
import { useQuery } from '@tanstack/react-query';
import LaundryCard from '@/components/LaundryCard';

const laundry = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { id, username, companyName, imageUrl, numReview, avgRating } = useLocalSearchParams();
    const { cart, getTotalPrice } = useCart();

    const { data: laundries, isFetching, isLoading, error } = useQuery({
        queryKey: ["laundry", id],
        queryFn: () => getUserLaundryServices(id as string),
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
    if (!laundries?.data) {
        <View
            style={{
                flex: 1,
                backgroundColor: activeColor.background,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>No laundries!</Text>
        </View>;
    }


    return (
        <>
            <StatusBar
                translucent
                style={theme.mode === "dark" ? "light" : "dark"}
                backgroundColor={activeColor.background}
            />
            <Image
                source={imageUrl}
                contentFit="cover"
                transition={1000}
                style={styles.image}
            />
            <View
                style={{
                    padding: 10,
                    marginBottom: 10,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: activeColor.borderColor
                }}
            >
                <Text
                    style={{
                        fontFamily: "Poppins-SemiBold",
                        textTransform: "capitalize",
                        color: activeColor.text,
                    }}
                >
                    {username || companyName}
                </Text>
                <Text
                    style={[{ color: activeColor.text, fontFamily: "Poppins-Thin" }]}
                >
                    Address
                </Text>
                {numReview > 0 && (<View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Text
                        style={[{ color: activeColor.text, fontFamily: "Poppins-Thin" }]}
                    >
                        {avgRating}
                    </Text>
                    <AntDesign name="staro" color={'gold'} size={10} style={{ marginTop: -3 }} />
                    <Text
                        style={[{ color: activeColor.icon, fontFamily: "Poppins-Thin", marginLeft: 3, fontSize: 12 }]}
                    >
                        ({numReview} {numReview > 1 ? 'reviews' : 'review'})
                    </Text>
                </View>)}
            </View>
            <View
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={laundries?.data}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => <LaundryCard laundry={item} />}
                />
                {cart.foods?.length >= 1 && (
                    <View style={{ paddingHorizontal: 10 }}>
                        <ViewCartBtn
                            label="Delivery Info"
                            totalItem={cart.foods.length}
                            totalCost={getTotalPrice().toFixed(2)}
                            onPress={() => router.push("(restaurant)/deliveryInfo")}
                        />
                    </View>
                )}
            </View>
        </>
    );
}

export default laundry

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        height: Dimensions.get("screen").height * 0.2,
        width: Dimensions.get("screen").width,
        alignSelf: "stretch",
        resizeMode: "cover",
    },
});