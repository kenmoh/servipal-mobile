import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import ServiceCard from "@/components/ServiceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/auth/authContext";


const services = [
    {
        href: "(order)/createOrder",
        imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/package.png",
        label: "Send Item(s)",
    },
    {
        href: "(restaurant)/addMeal",
        imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/fastfood.png",
        label: "Add Meal",
    },
    {
        href: "(laundry)/addLaundry",
        imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/laundry.png",
        label: "Add Laundry",
    },
    {
        href: "(p2p)/addItem",
        imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/trade.png",
        label: "Sell",
    },
];
const servicesUser = [
    {
        href: "(order)/createOrder",
        imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/package.png",
        label: "Send Item(s)",
    },

    {
        href: "(p2p)/addItem",
        imageUrl: "https://mohdelivery.s3.amazonaws.com/kiakiaIcons/trade.png",
        label: "Sell",
    },
];

const welcome = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: activeColor.background }]}
        >

            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {
                    user?.user_type === 'Restaurant Service Provider' || user?.user_type === 'Laundry Service Provider' ? (

                        services.map(service =>
                            <ServiceCard
                                key={service.href}
                                href={service.href}
                                imageUrl={service.imageUrl}
                                label={service.label}
                            />
                        )
                    ) : (servicesUser.map(service =>
                        <ServiceCard
                            key={service.imageUrl}
                            href={service.href}
                            imageUrl={service.imageUrl}
                            label={service.label}
                        />))
                }

            </View>

        </SafeAreaView>
    );
};

export default welcome;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins-Black",
        marginVertical: 10
    },
});
