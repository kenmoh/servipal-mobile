import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import * as Linking from "expo-linking";
import { A } from "@expo/html-elements";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/Sizes";

type SupportCardPropType = {
    phoneNumber: string;
    isWhatsapp?: boolean
};

const SupportCard = ({ phoneNumber, isWhatsapp = false }: SupportCardPropType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={{ marginVertical: SIZES.marginSmall }}>

            {
                isWhatsapp ? (<TouchableOpacity style={styles.callContainer}>
                    <FontAwesome name="whatsapp" size={18} color={activeColor.icon} />
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
                </TouchableOpacity>) : (
                    <TouchableOpacity
                        style={styles.callContainer}
                        onPress={() => Linking.openURL(`tel: ${phoneNumber}`)}
                    >

                        <MaterialIcons name="phone" size={18} color={activeColor.icon} />

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
                )
            }





        </View>
    );
};

export default SupportCard;

const styles = StyleSheet.create({
    callContainer: {
        flexDirection: "row",
        gap: 10,
    },
});
