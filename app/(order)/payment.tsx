import { showMessage } from "react-native-flash-message";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { WebView } from "react-native-webview";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import transfer from "@/api/transfer";
import client from "@/api/client";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { payWithWallet } from "@/api/payment";

const TIME_OUT = 3000

type TransferBtnType = {
    onPress: () => void;
    label: string;
    color: string;
    backgroundColor: string;
    icon: ReactNode;
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

interface TransferDetailResponse {
    data: {
        transfer_reference: string;
        account_number: string;
        bank_name: string;
        amount: number;
        mode: string;
    };
}

const payment = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [showWebView, setShowWebView] = useState(false);
    const [redirectedUrl, setRedirectedUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { paymentUrl, totalCost, id } = useLocalSearchParams();

    const status = redirectedUrl?.url?.split("?")[1]?.split("&");

    const handleOpenWebView = () => {
        if (!paymentUrl) {
            return;
        }
        setShowWebView(true);
    };

    const { isPending, mutate } = useMutation({
        mutationFn: (orderId: string) => payWithWallet(orderId),
        onError: (error: Error) => {

            showMessage({
                message: error.message,
                type: "danger",
                textStyle: {
                    alignItems: "center",
                },
            });
            router.push({
                pathname: 'paymentStatus',
                params: {
                    image: '../assets/animations/paymentFailed.json',
                    status
                }
            });
        },
        onSuccess: (data) => {
            showMessage({
                message: data?.message || 'Payment Successful.',
                type: "success",
                textStyle: {
                    alignItems: "center",
                },
            });


            router.push({
                pathname: 'paymentStatus',
                params: {
                    image: '../assets/animations/paymentSuccess.json',
                    status

                }
            });

        },

    })

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

    // useEffect(() => {
    //     if (status?.[0] === "status=successful") {
    //         router.push("/paymentSuccess");
    //         showMessage({
    //             message: "Payment Successful!",
    //             type: "success",
    //         });
    //         setTimeout(() => {
    //             router.push("/(drawer)/topTab");
    //         }, TIME_OUT);

    //     }
    //     if (status?.[0] === "status=failed" || status?.[0] === "status=cancelled") {
    //         router.push("/paymentFailed");
    //         showMessage({
    //             message: "Payment failed to complete!",
    //             type: "danger",
    //         });
    //         setTimeout(() => {
    //             router.push("/(drawer)/stats");
    //         }, TIME_OUT);
    //     }
    // }, [status]);

    return (
        <>
            <CustomActivityIndicator visible={isPending} />
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
                        <Text style={[styles.btnText, { color: activeColor.text }]}>
                            TOTAL: ₦{totalCost}
                        </Text>
                        <TransferBtn
                            icon={<AntDesign name="creditcard" size={24} color={activeColor.icon} />}
                            label="CARD"
                            color={activeColor.text}
                            backgroundColor={activeColor.profileCard}
                            onPress={handleOpenWebView}

                        />
                        <TransferBtn
                            icon={<Entypo name="wallet" size={24} color={activeColor.icon} />}
                            label="WALLET"
                            color={activeColor.text}
                            backgroundColor={activeColor.profileCard}
                            onPress={() => mutate(id as string)}

                        />
                        <TransferBtn
                            icon={<MaterialCommunityIcons name="bank-transfer" size={24} color={activeColor.icon} />}
                            label="BANK TRANSFER"
                            color={activeColor.text}
                            backgroundColor={activeColor.profileCard}
                            onPress={handleGetTransferDetails}

                        />

                    </>
                )}
            </View>
        </>
    );
};

export default payment;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 25,
        gap: 25
    },
    container: {
        flex: 1,
        width: Dimensions.get("screen").width,
    },
    button: {
        width: "100%",
        borderRadius: 10,
        padding: 15,

        flexDirection: "row",
        gap: 10,
    },

    btnText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
    },
});
