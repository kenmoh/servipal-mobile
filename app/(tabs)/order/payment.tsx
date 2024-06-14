import { showMessage } from 'react-native-flash-message';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react'
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const payment = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [showWebView, setShowWebView] = useState(false);
    const [redirectedUrl, setRedirectedUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const params = useLocalSearchParams();
    const { paymentUrl, totalCost, id } = params;

    console.log(paymentUrl, redirectedUrl)

    const status = redirectedUrl?.url?.split("?")[1]?.split("&");

    console.log('REDIRECT: ', redirectedUrl?.url)
    console.log('WEBVIEW: ', showWebView)

    const handleOpenWebView = () => {
        setShowWebView(true);
    };

    useEffect(() => {
        if (status?.[0] === "status=successful") {
            router.push("/order/index");
            showMessage({
                message: "Payment Successful!",
                type: "success",
            });
        }
        if (status?.[0] === "status=failed" || status?.[0] === "status=cancelled") {
            router.push("/order/index");
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
                                PAY ₦ {totalCost}
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
        paddingHorizontal: 10,

    },
    container: {
        flex: 1,
    },
    button: {
        width: '100%',
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.btnPrimaryColor,
        paddingVertical: 15,
        alignSelf: "center",
    },

    btnText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 22
    }

})