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

const deposit = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [showWebView, setShowWebView] = useState(false);
    const [redirectedUrl, setRedirectedUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const params = useLocalSearchParams();
    const { depositUrl, amount, id } = params;


    const status = redirectedUrl?.url?.split("?")[1]?.split("&");

    const handleOpenWebView = () => {
        if (!depositUrl) {
            return;
        }
        setShowWebView(true);
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
                message: "Top up Successful!",
                type: "success",
            });
            setTimeout(() => {
                router.push("/(tabs)/wallet");
            }, TIME_OUT);

        }
        if (status?.[0] === "status=failed" || status?.[0] === "status=cancelled") {
            router.push("/paymentFailed");
            showMessage({
                message: "Failed to complete!",
                type: "danger",
            });
            setTimeout(() => {
                router.push("/(tabs)/wallet");
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
                            source={{ uri: depositUrl }}
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
                            TOTAL: ₦{amount}
                        </Text>
                        <TransferBtn
                            icon={<AntDesign name="creditcard" size={24} color={activeColor.icon} />}
                            label="CARD"
                            color={activeColor.text}
                            backgroundColor={activeColor.profileCard}
                            onPress={handleOpenWebView}

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

export default deposit;

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
