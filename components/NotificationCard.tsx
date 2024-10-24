import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import ProfileContainer from "./ProfileContainer";
import { UserDisputes } from "@/utils/types";
import { router } from "expo-router";

const NotificationCard = ({
    notificationId,
    item,
}: {
    notificationId: number;
    item: UserDisputes;
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [isRead, setIsRead] = useState(false);


    useEffect(() => {
        const loadReadState = async () => {
            const storedState = await SecureStore.getItemAsync(
                `notification_${notificationId}`
            );
            if (storedState !== null) {
                setIsRead(JSON.parse(storedState));
            }
        };

        loadReadState();
    }, [notificationId]);

    const handlePress = async () => {
        const newReadState = true;
        setIsRead(newReadState);
        await SecureStore.setItemAsync(
            `notification_${notificationId}`,
            JSON.stringify(newReadState)
        );
    };

    return (
        <TouchableOpacity
            onPress={() => {
                router.push({
                    pathname: `(order)/disputesResponse`,
                    params: {
                        id: item.id,
                        username: item.username,
                        subject: item.subject,
                        status: item.status,
                        content: item.content,
                        createdAt: item.created_at,
                        responses: JSON.stringify(item.responses)
                    },
                });
                handlePress;
            }}
        >
            <ProfileContainer>
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
                            color: isRead ? activeColor.icon : activeColor.text,
                            fontSize: 14,
                            fontFamily: "Poppins-Medium",
                            textTransform: 'capitalize'
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
                        color: isRead ? activeColor.icon : activeColor.text,
                        fontSize: 12,
                        fontFamily: "Poppins-Regular",
                    }}
                >
                    {item.content}
                </Text>
            </ProfileContainer>
        </TouchableOpacity>
    );
};

export default NotificationCard;

const styles = StyleSheet.create({});
