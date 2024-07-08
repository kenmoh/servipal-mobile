import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import CustomTextInput from '@/components/CustomTextInput'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import TitleText from '@/components/TitleText';
import { Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { walletValidationSchema } from '@/utils/validations';
import InputErrorMessage from '@/components/InputErrorMessage';
import CustomBtn from '@/components/CustomBtn';
import { StatusBar } from 'expo-status-bar';
import userApi from '@/api/users'
import { showMessage } from 'react-native-flash-message';
import { router } from 'expo-router';


type DepositType = {
    amount: number
    id: string
    user_id: string,
    wallet_id: string
    current_username_or_company_name: string,
    fund_status: string,
    payment_url: string,
    created_at: string
}
const fundWallet = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode]

    const { error, isSuccess, mutate, isPending, data } = useMutation<DepositType>({
        mutationFn: (amount: number) => userApi.fundWallet(amount),
    });

    console.log(data)


    useEffect(() => {

        if (error) {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                    justifyContent: 'center'
                },
            });
            router.push("/wallet/fundWallet");
        }
        if (isSuccess) {
            showMessage({
                message: "Order added successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                    justifyContent: 'center',
                },
            });
            router.push({
                pathname: "/wallet/deposit",
                params: { depositUrl: data?.payment_url, id: data?.id, amount: data?.amount },
            });
        }
    }, [error, isSuccess])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    backgroundColor: activeColor.background,
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <CustomActivityIndicator visible={isPending} />
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                        borderRadius: 10,
                        padding: 20,
                        backgroundColor: activeColor.background,
                    }}
                >
                    <TitleText label="Fund Wallet" textColor={activeColor.text} />
                    <Formik
                        initialValues={{ amount: 0 }}
                        validationSchema={walletValidationSchema}
                        onSubmit={mutate}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <>
                                <View>
                                    <CustomTextInput
                                        label="Amount"
                                        hasBorder={theme.mode !== "dark"}
                                        keyboardType="number-pad"
                                        onChangeText={handleChange("amount")}
                                        value={values.amount}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                    />
                                    {touched.amount && errors.amount && (
                                        <InputErrorMessage error={errors.amount} />
                                    )}

                                    <View style={{ marginVertical: 25 }}>
                                        <CustomBtn
                                            btnColor={Colors.btnPrimaryColor}
                                            label="Send"
                                            btnBorderRadius={5}
                                            onPress={handleSubmit}
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>

            </View>
            <StatusBar style="light" backgroundColor={activeColor.background} />
        </SafeAreaView>
    )
}

export default fundWallet

const styles = StyleSheet.create({})