import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { SIZES } from "@/constants/Sizes";

const paymentStatus = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const params = useLocalSearchParams()
    const imageKey = Array.isArray(params.image) ? params.image[0] : params.image

    const images = {
        success: require('@/assets/animations/paymentSuccess.json'),
        failed: require('@/assets/animations/paymentFailed.json'),
    };

    const IMAGE = images[imageKey]

    console.log(params.status, '=========================')

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
                    source={IMAGE}
                    autoPlay
                    loop
                    style={{
                        flex: 1,
                        height: 300,
                        width: 300
                    }}
                />
            </View>
            <View style={{ flex: 1, marginVertical: SIZES.marginXLarge }}>
                <View style={{ width: '90%', alignSelf: 'center', height: StyleSheet.hairlineWidth, backgroundColor: activeColor.profileCard, marginVertical: SIZES.marginSmall }} />
                <TouchableOpacity onPress={() => router.push('(drawer)/(tabs)/stats')} style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, justifyContent: 'center' }}>
                    <AntDesign name="barchart" color={activeColor.icon} size={18} />
                    <Text style={[styles.text, { color: activeColor.text }]}>View History</Text>
                </TouchableOpacity>
                <View style={{ width: '90%', alignSelf: 'center', height: StyleSheet.hairlineWidth, backgroundColor: activeColor.profileCard, marginVertical: SIZES.marginSmall }} />
                <TouchableOpacity onPress={() => router.push('(drawer)/(tabs)/topTab')} style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, justifyContent: 'center' }}>
                    <AntDesign name="home" color={activeColor.icon} size={18} />
                    <Text style={[styles.text, { color: activeColor.text }]}>Go Home</Text>
                </TouchableOpacity>
                <View style={{ width: '90%', alignSelf: 'center', height: StyleSheet.hairlineWidth, backgroundColor: activeColor.profileCard, marginVertical: SIZES.marginSmall }} />

            </View>

        </SafeAreaView>
    );
};

export default paymentStatus;

const styles = StyleSheet.create({
    text: { fontFamily: 'Poppins-Regular', fontSize: 14 }
});
