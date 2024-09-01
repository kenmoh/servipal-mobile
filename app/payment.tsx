import { showMessage } from "react-native-flash-message";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
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
import HDivider from "@/components/HDivider";
import { SIZES } from "@/constants/Sizes";

const TIME_OUT = 1500;

type OrderParams = {
    paymentUrl: string;
    totalCost: string;
    id: string;
    orderType: 'delivery' | 'food';
    itemCost: string;
    items: [];
    deliveryFee: string;
    paymentType: string
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

type TransferBtnType = {
    onPress: () => void;
    label: string;
    color: string;
    fontSize?: number;
    backgroundColor: string;
    icon: ReactNode;
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

const Label = ({ label, amount, textColor }: Labeltype) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: '100%'
            }}
        >
            <Text style={[styles.boldText, { color: textColor }]}>{label}</Text>
            <Text style={[styles.boldText, { color: textColor }]}>{amount}</Text>
        </View>
    );
};
const TransferBtn = ({
    onPress,
    icon,
    label,
    color,
    backgroundColor,
    fontSize = 18,

}: TransferBtnType) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor }]}
        >
            {icon}
            <Text style={[styles.btnText, { color, fontSize }]}>{label}</Text>
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
                    <Text style={[styles.text, { color: textColor }]}>
                        {quantity} x {' '}
                    </Text>
                )}
                <Text style={[styles.text, { color: textColor }]}>{label}</Text>
            </View>
            <Text style={[styles.text, { color: textColor }]}>{amount}</Text>
        </View>
    );
};

const payment = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [showWebView, setShowWebView] = useState(false);
    const [redirectedUrl, setRedirectedUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const params = useLocalSearchParams<OrderParams>()

    const status = redirectedUrl?.url?.split("?")[1]?.split("&");

    const handleOpenWebView = () => {
        if (!params.paymentUrl) {
            return;
        }
        setShowWebView(true);
    };

    const handlePayWithWallet = async (orderId: string) => {
        setIsLoading(true);
        const response = await client.post(`${orderId}/pay-with-wallet`);

        console.log(response.data)
        setIsLoading(false);

        if (!response.ok) {
            router.push("/failed");
            showMessage({
                message: 'Payment failed',
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
            router.push("/success");
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
            params.id as string
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
            router.push("success");
            showMessage({
                message: "Payment Successful!",
                type: "success",
            });
            setTimeout(() => {
                router.push("/(drawer)/topTab");
            }, TIME_OUT);
        }
        if (status?.[0] === "status=failed" || status?.[0] === "status=cancelled") {
            router.push("failed");
            showMessage({
                message: "Payment failed to complete!",
                type: "danger",
            });
            setTimeout(() => {
                router.push("/(drawer)/stats");
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
                            source={{ uri: params.paymentUrl }}
                            onNavigationStateChange={(navState) => {
                                setRedirectedUrl(navState);
                            }}
                            onLoadStart={() => setIsLoading(true)}
                            onLoadEnd={() => setIsLoading(false)}
                        />
                    </>
                ) : params.orderType === "delivery" ? (
                    <View style={{ paddingHorizontal: SIZES.paddingMedium, width: '100%', gap: 25, }}>
                        <Text style={[styles.btnText, { color: activeColor.text }]}>
                            TOTAL: ₦{params.totalCost}
                        </Text>
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
                        {params.paymentType !== 'fundWallet' && (
                            <TransferBtn
                                icon={<Entypo name="wallet" size={24} color={activeColor.icon} />}
                                label="WALLET"
                                color={activeColor.text}
                                backgroundColor={activeColor.profileCard}
                                onPress={() => handlePayWithWallet(params.id as string)}
                            />
                        )}
                        <TransferBtn
                            icon={
                                <MaterialCommunityIcons
                                    name="bank-transfer"
                                    size={24}
                                    color={activeColor.icon}
                                />
                            }
                            label="BANK TRANSFER"
                            color={activeColor.text}
                            backgroundColor={activeColor.profileCard}
                            onPress={handleGetTransferDetails}
                        />
                    </View>
                ) : (
                    params.orderType === "food" && (
                        <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ flex: 1, marginVertical: SIZES.paddingMedium, width: '90%', alignSelf: 'center' }}
                            >
                                {JSON.parse(params.items)?.map((item) => (
                                    <OrderItem
                                        label={item.name}
                                        amount={parseInt(item.price) * parseInt(item.quantity)}
                                        quantity={item.quantity}
                                        key={item.id}
                                        textColor={activeColor.icon}
                                    />
                                ))}
                                <HDivider />
                                <View style={{ marginVertical: 10 }}>
                                    <Label
                                        label="Delivery Feee"
                                        amount={params.deliveryFee}
                                        textColor={activeColor.icon}
                                    />

                                    <Label
                                        label="Item Cost"
                                        amount={params.itemCost}
                                        textColor={activeColor.icon}
                                    />
                                    <Label
                                        label="TOTAL COST"
                                        amount={params.totalCost}
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
                                    <View style={styles.btnContainer}>
                                        <TransferBtn
                                            fontSize={12}
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
                                    </View>
                                    <View style={styles.btnContainer}>
                                        <TransferBtn
                                            fontSize={12}
                                            icon={
                                                <Entypo
                                                    name="wallet"
                                                    size={24}
                                                    color={activeColor.icon}
                                                />
                                            }
                                            label="WALLET"
                                            color={activeColor.text}
                                            backgroundColor={activeColor.profileCard}
                                            onPress={() => handlePayWithWallet(params.id as string)}
                                        />
                                    </View>
                                    <View style={[styles.btnContainer, { width: '35%', marginLeft: 5 }]}>
                                        <TransferBtn
                                            fontSize={12}
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
                            </View>
                        </>
                    )
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

    },
    container: {
        flex: 1,
        width: Dimensions.get("screen").width,
    },
    button: {
        borderRadius: 10,
        padding: 15,
        width: '100%',
        flexDirection: "row",
        gap: 10,
    },

    btnText: {
        fontFamily: "Poppins-SemiBold",

    },
    boldText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
    },

    text: {
        fontFamily: 'Poppins-Light',
        fontSize: 12
    },
    btnContainer: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
