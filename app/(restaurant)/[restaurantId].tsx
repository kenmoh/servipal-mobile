import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

import { getRestaurantMeals } from "@/api/foods";
import useApi from "@/api/users";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import FoodCard, { MealType } from "@/components/FoodCard";
import ViewCartBtn from "@/components/ViewCartBtn";
import { useCart } from "@/components/CartProvider";
import { AntDesign } from "@expo/vector-icons";
import HDivider from "@/components/HDivider";
import restaurant from "@/assets/images/restaurant.png";
import { CardProps } from "@/utils/types";
import { showMessage } from "react-native-flash-message";
import client from "@/api/client";
import { useAuth } from "@/auth/authContext";
import Empty from "@/components/Empty";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";

const TOP = Dimensions.get("screen").height * 0.1
const CENTER = Dimensions.get("screen").width * 0.5
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
    const { id } = useLocalSearchParams();
    const { cart, getTotalPrice } = useCart();
    const [image, setImage] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const { user } = useAuth()


    const {
        data: meals,
        isFetching,
        isLoading,
        error,
        refetch

    } = useQuery({
        queryKey: ["restaurant", id],
        queryFn: () => getRestaurantMeals(id as string),
        staleTime: 60 * 60 * 60,
    });


    const { data }: UseQueryResult<CardProps, Error> = useQuery({
        queryKey: ["restaurantUser", id],
        queryFn: () => useApi.getCurrentVendorUser(id as string),
    });

    useRefreshOnFocus(refetch);

    const uploadCoverImageMutation = useMutation({
        mutationFn: async (imageUri) => {
            const formData = new FormData();
            formData.append("image", {
                uri: imageUri,
                type: "image/jpeg",
                name: imageUri?.split("/").slice(-1)[0],
            });

            const response = await client.patch(
                "/users/update-company-background-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(response.data?.detail);
            }
            return response.data;
        },
    });
    const uploadProfileImageMutation = useMutation({
        mutationFn: async (imageUri) => {
            const formData = new FormData();
            formData.append("image", {
                uri: imageUri,
                type: "image/jpeg",
                name: imageUri?.split("/").slice(-1)[0],
            });

            const response = await client.patch(
                "/users/update-profile-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(response.data?.detail);
            }
            return response.data;
        },
        onSuccess: (data) => {
            setProfileImage(data?.profile_image)
            showMessage({
                message: "Image uploaded successfully!",
                type: "success",
            });
        },
        onError: (error: Error) => {
            showMessage({
                message: error.message || "Failed to upload image",
                type: "danger",
            });
        },
    });


    const selectCoverImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadCoverImageMutation.mutate(result?.assets[0]?.uri, {
                onError: (error) =>
                    showMessage({
                        message: error.message || "Something went wrong!",
                        type: "danger",
                        style: {
                            alignItems: "center",
                        },
                    }),
                onSuccess: (data) => {
                    setImage(data?.company_background_image);
                    showMessage({
                        message: "Image uploaded!",
                        type: "success",
                        style: {
                            alignItems: "center",
                        },
                    });
                },
            });
        }
    };

    const selectLogoImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            uploadProfileImageMutation.mutate(result?.assets[0]?.uri, {
                onError: (error) =>
                    showMessage({
                        message: error.message || "Something went wrong!",
                        type: "danger",
                        style: {
                            alignItems: "center",
                        },
                    }),
                onSuccess: (data) => {
                    setProfileImage(data?.profile_image);
                    showMessage({
                        message: "Image uploaded.",
                        type: "success",
                        style: {
                            alignItems: "center",
                        },
                    });
                },
            });
        }
    };


    return (
        <>
            <StatusBar
                translucent
                style={theme.mode === "dark" ? "light" : "dark"}
                backgroundColor={activeColor.background}
            />

            <TouchableOpacity
                onPress={selectCoverImage}
                disabled={user?.id !== id}

            >
                {uploadCoverImageMutation.isPending && (
                    <ActivityIndicator
                        size={50}
                        color={activeColor.icon}
                        style={{
                            position: "absolute",
                            top: TOP,
                            left: CENTER,
                            zIndex: 999,
                        }}
                    />
                )}


                <Image
                    source={data?.company_background_image || image || restaurant}
                    contentFit="cover"
                    transition={1000}
                    style={styles.image}
                />
            </TouchableOpacity>



            <TouchableOpacity
                onPress={selectLogoImage}
                disabled={user?.id !== id}
                style={[styles.logo, { borderColor: activeColor.profileCard }]}>

                {uploadProfileImageMutation.isPending && (
                    <ActivityIndicator
                        size={30}
                        color={activeColor.icon}
                        style={{
                            marginTop: 20,
                            alignSelf: 'center',
                            zIndex: 999,
                        }}
                    />
                )}
                <Image
                    source={data?.profile_image || profileImage || restaurant}
                    contentFit="cover"
                    transition={1000}
                    style={{ height: '100%', width: '100%' }}
                />
            </TouchableOpacity>


            {data && <View
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
                    style={[{ color: activeColor.icon, fontFamily: "Poppins-Medium" }]}
                >
                    {data?.location}
                </Text>

                {(data?.rating?.number_of_ratings ?? 0) >= 1 && (
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <View
                            style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                        >
                            <Text
                                style={[
                                    { color: activeColor.text, fontFamily: "Poppins-Medium" },
                                ]}
                            >
                                {data?.rating.average_rating}
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
                                        fontFamily: "Poppins-Medium",
                                        marginLeft: 3,
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                ({data?.rating.number_of_ratings} {data?.rating.number_of_ratings! > 1 ? "reviews" : "review"})
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => router.push({
                            pathname: 'reviews',
                            params: { reviews: JSON.stringify(data?.rating) }
                        })}>
                            <Text
                                style={{
                                    color: activeColor.icon,
                                    fontSize: 12,
                                    fontFamily: "Poppins-Medium",
                                    textDecorationLine: "underline",
                                }}
                            >
                                Reviews
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>}

            <View
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >
                {isFetching || isLoading && <View
                    style={{

                        backgroundColor: activeColor.background,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ActivityIndicator size={30} color={activeColor.tabIconDefault} />
                </View>}
                {error && <View
                    style={{
                        flex: 1,
                        backgroundColor: activeColor.background,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text>Something went wrong!</Text>
                </View>}
                <FlatList<MealType>
                    ListHeaderComponent={<Menu />}
                    showsVerticalScrollIndicator={false}
                    data={Array.isArray(meals?.data) ? meals.data : []}
                    keyExtractor={(item: MealType, index: number) => `${item?.id?.toString()}-${index}`}
                    renderItem={({ item, index }: { item: MealType, index: number }) => <FoodCard meal={item} style={{ marginBottom: index === meals?.data.length - 1 ? 10 : 3 }} />}
                    ListEmptyComponent={isFetching ? <Empty label="Loading Menu..." /> : <Empty label="No Meals Yet!" />}
                    refreshing={isFetching}
                    onRefresh={refetch}
                />
                {cart.items?.length >= 1 && (
                    <View style={{ paddingHorizontal: 10 }}>
                        <ViewCartBtn
                            label="Delivery Info"
                            totalItem={cart.items.length}
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
        height: Dimensions.get("screen").height * 0.25,
        width: Dimensions.get("screen").width,
        alignSelf: "stretch",

    },
    logo: {
        height: 70,
        width: 70,
        zIndex: 9999,
        position: "absolute",
        right: 10,
        top: Dimensions.get("screen").height * 0.2,
        borderRadius: 10,

        overflow: 'hidden',
        borderWidth: 3
    },
});
