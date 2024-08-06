import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import * as Linking from "expo-linking";
import { A } from "@expo/html-elements";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

type SupportCardPropType = {
    phoneNumber: string;
    username: string;
};

const SupportCard = ({ phoneNumber, username }: SupportCardPropType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={{ marginVertical: 10 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 20,
                    marginVertical: 5,
                }}
            >
                <TouchableOpacity
                    style={styles.callContainer}
                    onPress={() => Linking.openURL(`tel: ${phoneNumber}`)}
                >
                    <View
                        style={
                            {
                                height: 35, width: 35, backgroundColor: Colors.primaryBtnColor, alignItems: 'center',
                                justifyContent: 'center', borderRadius: 30, opacity: 0.3
                            }
                        }
                    >
                        <MaterialIcons name="smartphone" size={25} color={activeColor.icon} />
                    </View>
                    <View>
                        <Text
                            style={{ fontFamily: "Poppins-Light", color: activeColor.text }}
                        >
                            {username}
                        </Text>
                        <Text
                            style={{
                                color: activeColor.text,
                                fontFamily: "Poppins-Thin",
                                fontSize: 12,
                            }}
                        >
                            {phoneNumber}
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'baseline' }}>
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
                </TouchableOpacity> */}
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
        gap: 10,
    },
});
