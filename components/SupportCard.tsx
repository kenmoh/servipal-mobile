import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import * as Linking from "expo-linking";
import { A } from "@expo/html-elements";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";


type SupportCardPropType = {
    phoneNumber: string
    username: string
}

const SupportCard = ({ phoneNumber, username }: SupportCardPropType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={{ fontFamily: "Poppins-Light", color: activeColor.text }}>
                {username}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                    marginVertical: 5,
                }}
            >

                <TouchableOpacity style={styles.callContainer} onPress={() => Linking.openURL(`tel: ${phoneNumber}`)}>
                    <FontAwesome name="phone" size={20} color={activeColor.icon} />
                    <Text
                        style={{
                            color: activeColor.text,
                            fontFamily: "Poppins-Thin",
                            fontSize: 12,
                        }}

                    >
                        {phoneNumber}
                    </Text>
                </TouchableOpacity>



                <TouchableOpacity style={styles.callContainer}>
                    <FontAwesome name="whatsapp" size={20} color={activeColor.icon} />
                    <A href={`https://wa.me/${phoneNumber}`}>

                        <Text
                            style={{
                                color: activeColor.text,
                                fontFamily: "Poppins-Thin",
                                fontSize: 12,
                            }}
                        >
                            {phoneNumber}
                        </Text>
                    </A>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SupportCard;

const styles = StyleSheet.create({
    callContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
});
