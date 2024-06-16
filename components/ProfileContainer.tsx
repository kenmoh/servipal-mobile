import { StyleSheet, View } from "react-native";
import React, { ReactNode, useContext } from "react";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";


const ProfileContainer = ({ children }: { children: ReactNode }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={[styles.contentContainer, { backgroundColor: activeColor.profileCard }]}>

            {children}

        </View>
    );
};
export default ProfileContainer;

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
        paddingHorizontal: 20

    },

});
