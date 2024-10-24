import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import ProfileContainer from "@/components/ProfileContainer";
import { SIZES } from "@/constants/Sizes";
import { DisputeRespose } from "@/utils/types";
import HDivider from "@/components/HDivider";
import { Formik } from "formik";

import { ResponseValidation } from "@/utils/orderValidation";
import CustomGrowingInput from "@/components/ChatInput";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import orderApi from "@/api/orders";
import { useAuth } from "@/auth/authContext";
import { showMessage } from "react-native-flash-message";

const disputesResponse = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { id, username, subject, content, status, responses, createdAt } =
        useLocalSearchParams();

    const { mutate } = useMutation({
        mutationFn: (content: string) =>
            orderApi.respondToResponse(Number(id), content),
    });

    const { mutate: closeDispute, isPending } = useMutation({
        mutationFn: () =>
            orderApi.closeDispute(Number(id)),
        onSuccess: () => {
            showMessage({
                message: "Dispute Closed!",
                type: "success",
            });
            router.back();
        },
        onError: () => {
            showMessage({
                message: "Failed to close.",
                type: "danger",
            });
            router.back();
        },
    });

    return (
        <>

            {status === 'open' ? <Stack.Screen
                options={{
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: "teal",
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderRadius: 20
                            }}
                            onPress={closeDispute}
                        >
                            {isPending ? <ActivityIndicator size={25} color={activeColor.icon} /> : <Text style={{ color: activeColor.text }}>Close Dispute</Text>}

                        </TouchableOpacity>
                    ),
                }}
            /> : <Stack.Screen
                options={{
                    headerRight: () => (
                        <View
                            style={{
                                backgroundColor: 'teal',
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderRadius: 20
                            }}

                        >
                            <Text style={{ color: activeColor.text }}>Closed</Text>
                        </View>
                    ),
                }}
            />}
            <View
                style={{
                    flex: 1,
                    backgroundColor: activeColor.background,
                    paddingHorizontal: SIZES.paddingMedium,
                }}
            >
                <ProfileContainer>
                    <View style={{ marginVertical: SIZES.marginSmall }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    { color: activeColor.text, textTransform: "capitalize" },
                                ]}
                            >
                                {username}
                            </Text>
                            <Text
                                style={[
                                    {
                                        fontFamily: "Poppins-Light",
                                        fontSize: 11,
                                        color: activeColor.icon,
                                    },
                                ]}
                            >
                                {`${createdAt}`.split("T")[0]}
                            </Text>
                        </View>
                        <Text
                            style={[
                                {
                                    fontFamily: "Poppins-Light",
                                    fontSize: 11,
                                    color: activeColor.text,
                                },
                            ]}
                        >
                            {subject}
                        </Text>
                        <Text
                            style={[
                                {
                                    fontFamily: "Poppins-Light",
                                    fontSize: 11,
                                    color: activeColor.text,
                                },
                            ]}
                        >
                            {content}
                        </Text>
                    </View>
                </ProfileContainer>

                <FlatList
                    data={JSON.parse(responses)}
                    keyExtractor={(item, index) => `${item?.id.toString()}-${index}`}
                    renderItem={({ item }) => <ResponseCard item={item} />}
                    ItemSeparatorComponent={() => <HDivider />}
                />
            </View>
            {status === 'open' && <View>
                <Formik
                    initialValues={{ content: "" }}
                    validationSchema={ResponseValidation}
                    onSubmit={(values, { resetForm }) => {
                        mutate(values.content);
                        resetForm();
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <View
                            style={{
                                marginVertical: SIZES.marginLarge,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View style={{ width: "90%" }}>
                                <CustomGrowingInput
                                    value={values.content}
                                    onChange={handleChange("content")}
                                    placeholder="Type your message..."
                                />
                                {touched.content && errors.content && (
                                    <Text
                                        style={{
                                            color: Colors.btnPrimaryColor,
                                            fontSize: 12,
                                            marginLeft: 10,
                                            fontFamily: "Poppins-Thin",
                                        }}
                                    >
                                        {errors.content}
                                    </Text>
                                )}
                            </View>
                            <TouchableOpacity
                                style={{ position: "absolute", bottom: 20, right: 15 }}
                                hitSlop={25}
                                onPress={() => {
                                    handleSubmit();
                                    router.back();
                                }}
                            >
                                <Ionicons
                                    name="send-outline"
                                    size={20}
                                    color={Colors.btnPrimaryColor}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>}
        </>
    );
};

export default disputesResponse;

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 13,
    },
});

const ResponseCard = ({ item }: { item: DisputeRespose }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();

    return (
        <View style={{ marginVertical: SIZES.marginSmall }}>
            <View
                style={{
                    marginBottom: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        color: item?.user_id === user?.id ? "skyblue" : "teal",
                        fontSize: 14,
                        fontFamily: "Poppins-Medium",
                        textTransform: "capitalize",
                    }}
                >
                    {item.username}
                </Text>
                <Text
                    style={{
                        color: activeColor.icon,
                        fontSize: 12,
                        fontFamily: "Poppins-Light",
                    }}
                >
                    {item.created_at.split("T")[0]}
                </Text>
            </View>
            <Text
                style={{
                    color: activeColor.text,
                    fontSize: 12,
                    fontFamily: "Poppins-Regular",
                }}
            >
                {item.content}
            </Text>
        </View>
    );
};
