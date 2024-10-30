import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SIZES } from "@/constants/Sizes";

const paymentStatus = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const params = useLocalSearchParams()


    console.log(params.status)

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
                <Feather name={params.status === 'status=successful' ? "check-circle" : "alert-circle"} size={70} color={params.status === 'status=successful' ? Colors.success : Colors.error} />
                <Text style={{ marginTop: SIZES.marginSmall, color: params.status === 'status=successful' ? 'teal' : Colors.error, fontSize: 16, fontFamily: 'Poppins-Regular' }}>{params.status === 'status=successful' ? "Payment Successful" : "Payment Failed"}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', gap: 10, flexDirection: 'row', marginTop: SIZES.marginLarge }}>

                <TouchableOpacity onPress={() => router.push('(drawer)/(tabs)/stats')} style={[styles.btn, { backgroundColor: activeColor.profileCard }]}>
                    <AntDesign name="barchart" color={activeColor.icon} size={18} />
                    <Text style={[styles.text, { color: activeColor.text }]}>History</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('(drawer)/(tabs)/topTab')} style={[styles.btn, { backgroundColor: activeColor.profileCard }]}>
                    <AntDesign name="home" color={activeColor.icon} size={18} />
                    <Text style={[styles.text, { color: activeColor.text }]}>Home</Text>
                </TouchableOpacity>


            </View>

        </SafeAreaView>
    );
};

export default paymentStatus;

const styles = StyleSheet.create({
    text: { fontFamily: 'Poppins-Regular', fontSize: 14 },
    btn: {
        gap: 10, justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 80,
        borderRadius: SIZES.paddingSmall
    }


});
