import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { UserReturn } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/auth/authContext";
import userApi from '@/api/users'
import Status from "./Status";




const RiderCard = ({ rider }: { rider: UserReturn }) => {
    const { theme } = useContext(ThemeContext);
    const { user } = useAuth()

    let activeColor = Colors[theme.mode];

    const { error, isSuccess, mutate, isPending } = useMutation({
        mutationFn: () => userApi.dispatchSuspenRider(rider.id),
    });

    const blockRider = async () => {
        const response = await userApi.dispatchSuspenRider(rider?.id)
        return response.data

    };

    return (
        <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                {rider.photo_url ? <Image
                    source={rider.photo_url}
                    style={{ height: 75, width: 75, borderRadius: 10 }}
                /> :
                    <Image
                        source={require('../assets/images/profile.jpg')}
                        style={{ height: 75, width: 75, borderRadius: 10 }}
                    />}
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
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
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center", marginBottom: 5 }}>
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
                <Status
                    onPress={blockRider}
                    text={rider?.is_suspended ? 'Unblock' : 'Block'}
                    backgroundColor={rider?.is_suspended ? Colors.error : Colors.success

                    }
                    pillWidth={90}
                    pVertical={5}
                    pHorizontal={6}
                    textColor={rider?.is_suspended ? "#c8553d" : "#25a18e"}
                />

            </View>
        </ScrollView>
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
