import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { router, useLocalSearchParams } from 'expo-router';
import { showMessage } from 'react-native-flash-message';
import { useMutation } from '@tanstack/react-query';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { SIZES } from '@/constants/Sizes';
import { buyItemValidationSchema } from '@/utils/validations';
import CustomTextInput from '@/components/CustomTextInput';
import InputErrorMessage from '@/components/InputErrorMessage';
import CustomBtn from '@/components/CustomBtn';
import { ItemInfo, makePayment } from '@/api/items';

const buyItem = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { price, id } = useLocalSearchParams()


    const { error, isSuccess, mutate, isPending, data } =
        useMutation({
            mutationFn: (info: ItemInfo) => makePayment(id, info),
        });
    console.log(data?.total_cost, data?.id)
    console.log(data)

    useEffect(() => {
        if (error) {
            showMessage({
                message: error.message || "Something went wrong!",
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.push("(p2p)/buyItem");
        }
        if (isSuccess) {
            showMessage({
                message: "Item successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push({
                pathname: "payment",
                params: {
                    paymentUrl: data?.payment_url,
                    orderType: 'delivery',
                    id: data?.id,
                    totalCost: data?.total_cost,
                },
            });
        }
    }, [error, isSuccess]);
    return (
        <>
            <CustomActivityIndicator visible={isPending} />
            <View style={{
                backgroundColor: activeColor.background,
                flex: 1,
                paddingHorizontal: SIZES.paddingSmall
            }}>
                <KeyboardAvoidingView

                >
                    <StatusBar style="inverted" />


                    <Formik
                        initialValues={{
                            quantity: "",
                            additionalInfo: "",


                        }}
                        onSubmit={(values, { resetForm }) => mutate(values, { onSuccess: () => resetForm() })}
                        validationSchema={buyItemValidationSchema}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <>
                                {
                                    price && (
                                        <View style={styles.textContainer}>
                                            <Text style={[styles.text, { color: activeColor.text }]}>Total Cost: </Text>
                                            <Text style={[styles.text, { color: activeColor.text }]}>₦{price}</Text>
                                        </View>)
                                }
                                <CustomTextInput
                                    onChangeText={handleChange("quantity")}
                                    value={values.quantity}
                                    labelColor={activeColor.text}
                                    label="Quantity"
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                    keyboardType='number-pad'
                                />
                                {touched.quantity && errors.quantity && (
                                    <InputErrorMessage error={errors.quantity} />
                                )}


                                <CustomTextInput

                                    onChangeText={handleChange("additionalInfo")}
                                    value={values.additionalInfo}
                                    labelColor={activeColor.text}
                                    label="Additional Info"
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                    multiline


                                />

                                <View style={{ marginVertical: 30 }}>
                                    <CustomBtn
                                        label="Buy"
                                        btnColor="orange"
                                        onPress={handleSubmit}
                                    />
                                </View>



                            </>
                        )}
                    </Formik>

                </KeyboardAvoidingView>
            </View>
        </>
    );
}

export default buyItem

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginVertical: SIZES.marginSmall
    },
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        textTransform: 'uppercase'
    }
})