import { ScrollView, StyleSheet, Image, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import BouncyCheckBox from "react-native-bouncy-checkbox";

import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { UserReturn } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/auth/authContext";
import userApi from "@/api/users";
import profile from "@/assets/images/profile.jpg";
import { SIZES } from "@/constants/Sizes";

const RiderCard = ({ rider }: { rider: UserReturn }) => {
    const { theme } = useContext(ThemeContext);
    const { user } = useAuth();

    let activeColor = Colors[theme.mode];

    const { error, isSuccess, mutate, isPending } = useMutation({
        mutationFn: () => userApi.dispatchSuspenRider(rider.id),
    });

    const blockRider = async () => {
        const response = await userApi.dispatchSuspenRider(rider?.id);
        return response.data;
    };


    return (
        <View
            style={{
                width: "95%",
                alignSelf: "center",
                backgroundColor: activeColor.profileCard,
                marginVertical: 5,
                padding: SIZES.paddingSmall,
                borderRadius: 10
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                <Image
                    source={rider.photo_url || profile}
                    style={{ height: 75, width: 75, borderRadius: 10 }}
                />

                <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{
                                color: activeColor.icon,
                                fontFamily: "Poppins-Bold",
                                fontSize: 14,
                            }}
                        >
                            {rider.full_name}{" "}
                        </Text>
                        <Text style={[styles.text, { color: activeColor.icon }]}>
                            | {rider.phone_number}
                        </Text>
                    </View>
                    <Text style={[styles.text, { color: activeColor.icon }]}>
                        {rider.email}
                    </Text>
                </View>
            </View>
            <View
                style={[
                    styles.container,
                    { borderBottomColor: activeColor.borderColor },
                ]}
            >
                <View
                    style={{
                        flexDirection: "row",
                        gap: 20,
                        alignItems: "center",
                        marginBottom: 5,
                    }}
                >
                    <View style={styles.headerContainer}>
                        <Text style={[styles.headerText, { color: activeColor.icon }]}>
                            30
                        </Text>
                        <Text style={[styles.text, { color: activeColor.icon }]}>
                            Completed
                        </Text>
                    </View>
                    <View style={styles.headerContainer}>
                        <Text style={[styles.headerText, { color: activeColor.icon }]}>
                            40
                        </Text>
                        <Text style={[styles.text, { color: activeColor.icon }]}>
                            Pending
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 3.5 }}>
                    <BouncyCheckBox
                        isChecked={rider.is_suspended}
                        iconStyle={{ borderRadius: 5 }}
                        fillColor="teal"
                        size={20}
                        innerIconStyle={{ borderRadius: 5, borderColor: "teal" }}
                        onPress={blockRider}
                        style={{ width: 20, marginTop: -5 }}
                        hitSlop={20}
                    />
                    <Text
                        style={{
                            color: activeColor.icon,
                            fontFamily: "Poppins-Thin",
                            fontSize: 10,
                        }}
                    >
                        {rider.is_suspended ? "Unblock" : "Block"}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default RiderCard;

const styles = StyleSheet.create({
    text: {
        fontSize: 13,
        fontFamily: "Poppins-Light",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 5,
    },
    headerText: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",

    },
});
