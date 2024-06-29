import { showMessage } from 'react-native-flash-message';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react'
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { WebView } from 'react-native-webview';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import transfer from '@/api/transfer';
import client from "@/api/client";


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
    const params = useLocalSearchParams();
    const { paymentUrl, totalCost, id } = params;


    const status = redirectedUrl?.url?.split("?")[1]?.split("&");


    const handleOpenWebView = () => {
        if (!paymentUrl) {
            return;
        }
        setShowWebView(true);
    };


    const handlePayWithWallet = async (orderId: string) => {
        setIsLoading(true);
        const response = await client.post(`${orderId}/pay-with-wallet`)

        setIsLoading(false);

        if (!response.ok) {
            router.push("/paymentFailed");
            showMessage({
                message: response.data?.detail,
                type: "danger",
                textStyle: {
                    textAlign: 'center'
                }
            });
            setTimeout(() => {
                router.push("/(tabs)/topTab/myOrder");
            }, 5000);
        }
        if (response.ok) {
            router.push("/paymentSuccess");
            showMessage({
                message: response.data?.message,
                type: "success",
                textStyle: {
                    textAlign: 'center'
                }
            });

            setTimeout(() => {
                router.push("/(tabs)/topTab/myOrder");
            }, 5000);
        }


    };



    const handleGetTransferDetails = async () => {
        setIsLoading(true);
        const result = await transfer.transferPaymentDetail(id as string) as TransferDetailResponse;
        setIsLoading(false);
        router.push({
            pathname: '/transferDetail', params: {
                transfer_reference: result.data.transfer_reference,
                account_number: result.data.account_number,
                bank_name: result.data.bank_name,
                amount: result.data.amount,
                mode: result.data.mode,
            }
        });
    };

    useEffect(() => {
        if (status?.[0] === "status=successful") {
            router.push("/paymentSuccess");
            showMessage({
                message: "Payment Successful!",
                type: "success",
            });
        }
        if (status?.[0] === "status=failed" || status?.[0] === "status=cancelled") {
            router.push("/paymentFailed");
            showMessage({
                message: "Payment failed to complete!",
                type: "danger",
            });
        }
    }, [status]);

    return (
        <>
            <CustomActivityIndicator visible={isLoading} />
            <View style={[styles.wrapper, { backgroundColor: activeColor.background }]}>
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
                        <TouchableOpacity onPress={handleOpenWebView} style={styles.button}>
                            <Text style={[styles.btnText, { color: activeColor.text }]}>
                                PAY WITH CARD ₦ {totalCost}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePayWithWallet(id as string)} style={styles.button}>
                            <Text style={[styles.btnText, { color: activeColor.text }]}>
                                PAY WITH WALLET ₦ {totalCost}
                            </Text>
                        </TouchableOpacity>

                        <Text
                            style={{
                                color: activeColor.text,
                                textAlign: "center",
                                fontFamily: 'Poppins-SemiBold',
                                marginVertical: 15
                            }}
                        >
                            OR
                        </Text>

                        <TouchableOpacity onPress={handleGetTransferDetails} style={styles.transferBtn}>
                            <Text style={[styles.btnText, { color: activeColor.text }]}>
                                BANK TRANSFER
                            </Text>
                        </TouchableOpacity>



                    </>
                )}
            </View>

        </>
    )
}

export default payment

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 20,

    },
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
        width: Dimensions.get('screen').width
    },
    button: {
        width: '100%',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.btnPrimaryColor,
        paddingVertical: 7,
        alignSelf: "center",
    },
    transferBtn: {
        width: '100%',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.primaryBtnColor,
        paddingVertical: 7,
        alignSelf: "center",
        borderWidth: 2
    },

    btnText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18
    }

})