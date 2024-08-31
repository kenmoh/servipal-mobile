import { Colors } from "@/constants/Colors";
import { onboardingSlides } from "@/constants/onboarding";
import { SIZES } from "@/constants/Sizes";
import { ThemeContext } from "@/context/themeContext";
import { useContext, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: activeColor.background }}>
            <Swiper
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
