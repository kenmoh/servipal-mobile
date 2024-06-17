import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode, useContext } from "react";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext"
import { Feather } from "@expo/vector-icons";



type ProfileCardType = {
    label: string;
    onPress: () => void,
    icon?: ReactNode
    icon2?: 'chevron-right'
};

const LinkCard = ({ icon, label, onPress, icon2 }: ProfileCardType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <>
            <TouchableOpacity onPress={onPress}
                hitSlop={30}
                style={styles.contentContainer}
            >
                <View
                    style={{ flex: 1, flexDirection: "row", gap: 10, }}
                >
                    {icon}
                    <Text
                        style={{
                            color: activeColor.text,
                            fontFamily: "Poppins-Light",
                            fontSize: 14,
                        }}
                    >
                        {label}
                    </Text>

                </View>

                <Feather name={icon2} size={15} color={activeColor.icon} />

            </TouchableOpacity>

        </>
    );
};
export default LinkCard;

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: "row",
        width: '100%',
        marginVertical: 6,
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});
