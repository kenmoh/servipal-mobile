import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { UserReturn } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/auth/authContext";
import userApi from '@/api/users'




const RiderCard = ({ rider }: { rider: UserReturn }) => {
    const { theme } = useContext(ThemeContext);
    const { user } = useAuth()

    let activeColor = Colors[theme.mode];

    const { error, isSuccess, mutate, isPending } = useMutation({
        mutationFn: () => userApi.dispatchSuspenRider(rider.id),
    });

    const blockRider = async () => {
        const response = await userApi.dispatchSuspenRider(rider?.id)
        console.log(response.data)
        return response.data

    };

    console.log(rider.id)
    return (
        <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20 }} onPress={() => { }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                <Image
                    source={rider.photo_url}
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
                            {rider.full_name} {" "}
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
            <View style={[styles.container, { borderBottomColor: activeColor.borderolor }]}>
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
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
                <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                    <Text style={[styles.text, { color: activeColor.icon }]}>
                        {rider.is_suspended ? 'Unblock' : 'Block'}

                    </Text>
                    <Switch
                        thumbColor={rider.is_suspended ? "teal" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={blockRider}
                        value={rider.is_suspended}
                    />
                </View>
            </View>
        </TouchableOpacity>
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
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
