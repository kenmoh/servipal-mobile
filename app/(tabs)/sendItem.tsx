import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import ServiceCard from "@/components/ServiceCard";
import { SafeAreaView } from "react-native-safe-area-context";


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

const welcome = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: activeColor.background }]}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={services}
                keyExtractor={(item) => item.href.toString()}
                numColumns={2}

                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    gap: 20
                }}
                columnWrapperStyle={{ gap: 10 }}
                renderItem={({ item }) => (
                    <ServiceCard
                        href={item.href}
                        imageUrl={item.imageUrl}
                        label={item.label}
                    />
                )}
            />
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
