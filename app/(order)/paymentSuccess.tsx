import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

const paymentSuccess = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: activeColor.background }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: activeColor.background,
                }}
            >
                <LottieView
                    source={require("../../assets/animations/paymentSuccess.json")}
                    autoPlay
                    loop
                    style={{
                        flex: 1,
                        height: 400,
                        width: 400
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default paymentSuccess;

const styles = StyleSheet.create({});
