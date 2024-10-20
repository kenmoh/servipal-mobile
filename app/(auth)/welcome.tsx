import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { Colors } from "@/constants/Colors";
import { onboardingSlides } from "@/constants/onboarding";
import { SIZES } from "@/constants/Sizes";
import { ThemeContext } from "@/context/themeContext";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const Onboarding = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0)


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: activeColor.background }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => router.replace('/(auth)/signin')} style={{ width: 75, alignItems: 'center', position: 'absolute', top: 50, right: 25, zIndex: 999, backgroundColor: Colors.btnPrimaryColor, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 }}>
                <Text style={{ color: activeColor.text, fontFamily: 'Poppins-Medium', fontSize: 14 }}>Skip</Text>

            </TouchableOpacity>

            <Swiper
                showsButtons
                buttonWrapperStyle={{ alignItems: 'flex-end' }}
                ref={swiperRef}
                loop={false}
                dot={
                    <View
                        style={[styles.dot, { backgroundColor: '#ddd', width: 10 }]}
                    />

                }
                activeDot={
                    <View
                        style={[styles.dot, { backgroundColor: Colors.btnPrimaryColor }]}
                    />

                }
                onIndexChanged={index => setActiveIndex(index)}

            >
                {onboardingSlides.map(slide => (
                    <View key={slide.id} style={styles.container}>
                        <Image source={slide.image} style={styles.image} resizeMode="cover" />
                        <View style={{ marginTop: 50, justifyContent: 'center', paddingHorizontal: SIZES.paddingLarge }}>
                            <Text style={[styles.titleText, { color: activeColor.text }]}>{slide.name}</Text>
                            <Text style={[styles.body, { color: activeColor.text }]}>{slide.description}</Text>
                        </View>
                    </View>
                ))}
            </Swiper>
            {activeIndex === onboardingSlides.length - 1 && (
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.replace('/(auth)/signin')} style={{ position: 'absolute', bottom: 10, right: 15, zIndex: 999, backgroundColor: Colors.btnPrimaryColor, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 20 }}>
                    <AntDesign name="check" size={20} />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    dot: {
        width: 25,
        height: 10,
        borderRadius: 10,
        marginLeft: 10
    },
    image: {
        width: '100%',
        height: 300
    },
    titleText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    },
    body: {
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        textAlign: 'justify'
    }
});
