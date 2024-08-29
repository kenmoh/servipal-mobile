import { showMessage } from "react-native-flash-message";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from "react-native";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { WebView } from "react-native-webview";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import transfer from "@/api/transfer";
import client from "@/api/client";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import HDivider from "@/components/HDivider";

const TIME_OUT = 1200;

type TransferBtnType = {
    onPress: () => void;
    label: string;
    color: string;
    backgroundColor: string;
    icon: ReactNode;
};

type OrderItemType = {
    label: string;
    textColor: string;
    quantity?: string;
    amount: number;
};

type Labeltype = {
    label: string | undefined;
    amount: string | undefined;
    textColor: string;
};

const TransferBtn = ({
    onPress,
    icon,
    label,
    color,
    backgroundColor,
}: TransferBtnType) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor }]}
        >
            {icon}
            <Text style={[styles.btnText, { color }]}>{label}</Text>
        </TouchableOpacity>
    );
};
const OrderItem = ({ quantity, label, amount, textColor }: OrderItemType) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginVertical: 5,
                }}
            >
                {quantity && (
                    <Text style={[styles.btnText, { color: textColor }]}>{quantity}x</Text>
                )}
                <Text style={[styles.btnText, { color: textColor }]}>{label}</Text>
            </View>
            <Text style={[styles.btnText, { color: textColor }]}>{amount}</Text>
        </View>
    );
};

const Label = ({ label, amount, textColor }: Labeltype) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Text style={[styles.boldText, { color: textColor }]}>{label}</Text>
            <Text style={[styles.boldText, { color: textColor }]}>{amount}</Text>
        </View>
    );
};
interface TransferDetailResponse {
    data: {
        transfer_reference: string;
        account_number: string;
        bank_name: string;
        amount: number;
        mode: string;
    };
}

type FoodParams = {
    paymentUrl: string;
    totalCost: string;
    id: string;
    foodCost: string;
    foods: [];
    deliveryFee: string;
};

const payment = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [showWebView, setShowWebView] = useState(false);
    const [redirectedUrl, setRedirectedUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { paymentUrl, totalCost, id, foodCost, foods, deliveryFee } = useLocalSearchParams<FoodParams>();
    const meals = JSON.parse(foods);




    const status = redirectedUrl?.url?.split("?")[1]?.split("&");

    const handleOpenWebView = () => {
        if (!paymentUrl) {
            return;
        }
        setShowWebView(true);
    };

    const handlePayWithWallet = async (orderId: string) => {
        setIsLoading(true);
        const response = await client.post(`${orderId}/pay-with-wallet`);

        setIsLoading(false);

        if (!response.ok) {
            router.push("/paymentFailed");
            showMessage({
                message: response.data?.detail,
                type: "danger",
                textStyle: {
                    alignItems: "center",
                },
            });
            setTimeout(() => {
                router.push("/(drawer)/stats");
            }, TIME_OUT);
        }
        if (response.ok) {
            router.push("/paymentSuccess");
            showMessage({
                message: response.data?.message,
                type: "success",
                textStyle: {
                    alignItems: "center",
                },
            });

            setTimeout(() => {
                router.push("/(drawer)/topTab");
            }, TIME_OUT);
        }
    };

    const handleGetTransferDetails = async () => {
        setIsLoading(true);
        const result = (await transfer.transferPaymentDetail(
            id as string
        )) as TransferDetailResponse;
        setIsLoading(false);
        router.push({
            pathname: "/transferDetail",
            params: {
                transfer_reference: result.data.transfer_reference,
                account_number: result.data.account_number,
                bank_name: result.data.bank_name,
                amount: result.data.amount,
                mode: result.data.mode,
            },
        });
    };

    useEffect(() => {
        if (status?.[0] === "status=successful") {
            router.push("/paymentSuccess");
            showMessage({
                message: "Payment Successful!",
                type: "success",
            });
            setTimeout(() => {
                router.push("(drawer)/topTab");
            }, TIME_OUT);
        }
        if (status?.[0] === "status=failed" || status?.[0] === "status=cancelled") {
            router.push("/paymentFailed");
            showMessage({
                message: "Payment failed to complete!",
                type: "danger",
            });
            setTimeout(() => {
                router.push("(drawer)/stats");
            }, TIME_OUT);
        }
    }, [status]);

    return (
        <>
            <CustomActivityIndicator visible={isLoading} />
            <View
                style={[styles.wrapper, { backgroundColor: activeColor.background }]}
            >
                {showWebView ? (
                    <>
                        <WebView
                            style={styles.container}
                            source={{ uri: paymentUrl }}
                            onNavigationStateChange={(navState) => {
                                setRedirectedUrl(navState);
                            }}
                            onLoadStart={() => setIsLoading(true)}
                            onLoadEnd={() => setIsLoading(false)}
                        />
                    </>
                ) : (
                    <>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ flex: 1, paddingHorizontal: 20, marginVertical: 15 }}
                        >
                            {meals?.map((meal) => (
                                <OrderItem
                                    label={meal.name}
                                    amount={parseInt(meal.price) * parseInt(meal.quantity)}
                                    quantity={meal.quantity}
                                    key={meal.id}
                                    textColor={activeColor.icon}
                                />
                            ))}
                            <HDivider />
                            <View style={{ marginVertical: 10 }}>
                                <Label
                                    label="Delivery Feee"
                                    amount={deliveryFee}
                                    textColor={activeColor.icon}
                                />
                                <Label
                                    label="Food/Laundry Cost"
                                    amount={foodCost}
                                    textColor={activeColor.icon}
                                />
                                <Label
                                    label="TOTAL COST"
                                    amount={totalCost}
                                    textColor={activeColor.text}
                                />
                            </View>
                        </ScrollView>
                        <View
                            style={{
                                bottom: 35,
                                left: 10,
                                right: 10,
                                position: "absolute",
                                alignItems: "center",
                            }}
                        >
                            <Text style={[styles.btnText, { color: activeColor.text }]}>
                                PAY WITH
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 5,
                                }}
                            >
                                <TransferBtn
                                    icon={
                                        <AntDesign
                                            name="creditcard"
                                            size={24}
                                            color={activeColor.icon}
                                        />
                                    }
                                    label="CARD"
                                    color={activeColor.text}
                                    backgroundColor={activeColor.profileCard}
                                    onPress={handleOpenWebView}
                                />
                                <TransferBtn
                                    icon={
                                        <Entypo name="wallet" size={24} color={activeColor.icon} />
                                    }
                                    label="WALLET"
                                    color={activeColor.text}
                                    backgroundColor={activeColor.profileCard}
                                    onPress={() => handlePayWithWallet(id as string)}
                                />
                                <TransferBtn
                                    icon={
                                        <MaterialCommunityIcons
                                            name="bank-transfer"
                                            size={24}
                                            color={activeColor.icon}
                                        />
                                    }
                                    label="TRANSFER"
                                    color={activeColor.text}
                                    backgroundColor={activeColor.profileCard}
                                    onPress={handleGetTransferDetails}
                                />
                            </View>
                        </View>
                    </>
                )}
            </View >
        </>
    );
};

export default payment;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        width: Dimensions.get("screen").width,
    },
    button: {
        maxWidth: 200,
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    btnText: {
        fontFamily: "Poppins-Medium",
        fontSize: 14,
    },

    boldText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
    },
});
