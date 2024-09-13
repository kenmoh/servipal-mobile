import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useContext } from "react";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { Link, router, useLocalSearchParams, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { getRestaurantMeals } from "@/api/foods";
import useApi from "@/api/users";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import FoodCard from "@/components/FoodCard";
import ViewCartBtn from "@/components/ViewCartBtn";
import { useCart } from "@/components/CartProvider";
import { AntDesign } from "@expo/vector-icons";
import HDivider from "@/components/HDivider";
import restaurant from '@/assets/images/restaurant.jpg'

const Menu = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                gap: 20,
                paddingHorizontal: 50,
            }}
        >
            <HDivider />
            <Text
                style={{
                    color: activeColor.text,
                    fontFamily: "Poppins-Bold",
                    letterSpacing: 15,
                    fontSize: 18,
                }}
            >
                Menu
            </Text>
            <HDivider />
        </View>
    )
}

const RestaurantDetails = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { id, username, companyName, imageUrl, numReview, avgRating } =
        useLocalSearchParams();
    const { cart, getTotalPrice } = useCart();

    const {
        data: meals,
        isFetching,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["restaurant", id],
        queryFn: () => getRestaurantMeals(id),
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
    if (!meals?.data) {
        <View
            style={{
                flex: 1,
                backgroundColor: activeColor.background,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>No Meals!</Text>
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
                source={imageUrl || restaurant}
                contentFit="cover"
                transition={1000}
                style={styles.image}
            />
            <View
                style={{
                    padding: 10,
                    marginBottom: 10,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: activeColor.borderColor,
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
                <Text style={[{ color: activeColor.text, fontFamily: "Poppins-Thin" }]}>
                    Address
                </Text>

                {numReview > 0 && (
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <View
                            style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                        >
                            <Text
                                style={[
                                    { color: activeColor.text, fontFamily: "Poppins-Thin" },
                                ]}
                            >
                                {avgRating}
                            </Text>
                            <AntDesign
                                name="staro"
                                color={"gold"}
                                size={10}
                                style={{ marginTop: -3 }}
                            />
                            <Text
                                style={[
                                    {
                                        color: activeColor.icon,
                                        fontFamily: "Poppins-Thin",
                                        marginLeft: 3,
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                ({numReview} {numReview > 1 ? "reviews" : "review"})
                            </Text>
                        </View>
                        <Link href={'sendItem'} asChild>
                            <Text
                                style={{
                                    color: activeColor.icon,
                                    fontSize: 12,
                                    fontFamily: "Poppins-Thin",
                                    textDecorationLine: 'underline'
                                }}
                            >
                                Reviews
                            </Text>
                        </Link>
                    </View>
                )}
            </View>

            <View
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >
                <FlatList
                    ListHeaderComponent={<Menu />}
                    showsVerticalScrollIndicator={false}
                    data={meals?.data}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => <FoodCard meal={item} />}

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
};

export default RestaurantDetails;

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
