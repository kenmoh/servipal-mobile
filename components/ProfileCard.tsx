import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode, useContext } from "react";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";


type ProfileCardType = {
    image?: string;
    name?: string;
    email?: string;
    phoneNumber?: string
    onPress?: () => void,
};

const ProfileCard = ({ image, name, email, phoneNumber, onPress }: ProfileCardType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={[styles.contentContainer, { backgroundColor: activeColor.profileCard }]}>
            <View
                style={{ flex: 1, flexDirection: "row", gap: 20, alignItems: "center" }}
            >

                <Image
                    source={{ uri: image }}
                    style={styles.image}
                    contentFit="cover"
                    transition={100}
                />


                <View style={{}}>
                    <Text
                        style={{
                            color: activeColor.text,
                            fontFamily: "Poppins-Light",
                            fontSize: 14,
                        }}
                    >
                        {name} | {phoneNumber || ''}
                    </Text>
                    <Text
                        style={{
                            color: activeColor.icon,
                            fontFamily: "Poppins-Light",
                            fontSize: 12,
                        }}
                    >
                        {email}
                    </Text>
                </View>


            </View>

            <Feather name="edit" size={15} color={activeColor.icon} onPress={onPress} />
        </View>
    );
};
export default ProfileCard;

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: "row",
        padding: 15,
        borderRadius: 5,
        marginVertical: 5

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});
