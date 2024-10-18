import { useAuth } from "@/auth/authContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface AppSwipe {
    children: React.ReactNode;
    onPress: (id: string) => void
    orderId: string
}

const AppSwipeable = ({ children, onPress, orderId }: AppSwipe) => {
    const { user } = useAuth();
    return (
        <>
            {user?.user_type === "Restaurant Service Provider" ? (
                <Swipeable
                    overshootLeft
                    renderRightActions={() => (
                        <TouchableOpacity
                            onPress={() => onPress(orderId)}
                            activeOpacity={0.6}
                            style={{
                                backgroundColor: "teal",
                                width: 100,
                                alignItems: "center",
                                justifyContent: "center",
                                marginVertical: 2.5,
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ color: "white", fontFamily: 'Poppins-SemiBold', fontSize: 12 }}>Order Served</Text>
                        </TouchableOpacity>
                    )}
                >
                    {children}
                </Swipeable>
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default AppSwipeable;

const styles = StyleSheet.create({});
