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
import { useQuery, UseQueryResult } from "@tanstack/react-query";
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
import restaurant from "@/assets/images/restaurant.jpg";

type VendorUserProfile = {
    id: string;
    company_name: string;
    email: string;
    phone_number: string;
    profile_image: string;
    location: string;
    company_background_image: string;
    opening_hour: string;
    closing_hour: string;
};

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
    );
};

const RestaurantDetails = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { id, imageUrl, numReview, avgRating } = useLocalSearchParams();
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

    const { data }: UseQueryResult<VendorUserProfile, Error> = useQuery({
        queryKey: ["restaurantUser", id],
        queryFn: () => useApi.getCurrentVendorUser(id as string),
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
                source={data?.company_background_image || restaurant}
                contentFit="cover"
                transition={1000}
                style={styles.image}
            />
            <View style={[styles.logo, { borderColor: activeColor.profileCard }]}>
                <Image
                    source={data?.company_background_image || restaurant}
                    contentFit="cover"
                    transition={1000}
                    style={{ height: '100%', width: '100%' }}
                />
            </View>
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
                    {data?.company_name}
                </Text>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                    <AntDesign name="clockcircleo" size={16} color={activeColor.icon} />
                    <Text
                        style={[{ color: activeColor.icon, fontFamily: "Poppins-Light" }]}
                    >
                        {data?.opening_hour} - {data?.closing_hour}
                    </Text>
                </View>
                <Text
                    style={[{ color: activeColor.icon, fontFamily: "Poppins-Light" }]}
                >
                    {data?.location}
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
                        <Link href={"sendItem"} asChild>
                            <Text
                                style={{
                                    color: activeColor.icon,
                                    fontSize: 12,
                                    fontFamily: "Poppins-Thin",
                                    textDecorationLine: "underline",
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
    logo: {
        height: 70,
        width: 70,
        zIndex: 9999,
        position: "absolute",
        right: 10,
        top: Dimensions.get("screen").height * 0.2 - 35,
        borderRadius: 10,

        overflow: 'hidden',
        borderWidth: 3
    },
});
