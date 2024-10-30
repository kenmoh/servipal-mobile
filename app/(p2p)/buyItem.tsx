import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
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
import { Entypo } from '@expo/vector-icons';
import { number } from 'yup';

const buyItem = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { price, id, image, name, seller } = useLocalSearchParams()

    // const image = JSON.parse(image)

    const { mutate, isPending } =
        useMutation({
            mutationFn: (info: ItemInfo) => makePayment(id, info),
            onError: (error: Error) => {
                showMessage({
                    message: error.message || "Something went wrong!",
                    type: "danger",
                    style: {
                        alignItems: "center",
                    },
                });
                router.back();
            },
            onSuccess: (data) => {
                console.log(data, 'vvvvvvvvvvvvvvvvvv')

                showMessage({
                    message: "Transaction Initialized.",
                    type: "default",
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
        });



    return (
        <>
            <CustomActivityIndicator visible={isPending} />
            <View style={{
                backgroundColor: activeColor.background,
                flex: 1,
                paddingHorizontal: SIZES.paddingSmall
            }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1
                    }}

                >
                    <StatusBar style="inverted" />

                    <View style={{ width: '100%', height: 200, borderRadius: SIZES.paddingSmall, overflow: 'hidden' }}>
                        {image && <Image src={JSON.parse(image)} style={{ width: '100%', height: '100%' }} />}
                    </View>
                    <View style={{ marginVertical: SIZES.marginSmall }}>
                        <Text style={[styles.label, { color: activeColor.icon }]}>{name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: SIZES.marginSmall }}>
                            <Entypo name='shop' color={activeColor.icon} size={20} />
                            <Text style={[styles.label, { color: activeColor.icon, textTransform: 'capitalize' }]}>{seller}</Text>
                        </View>
                    </View>


                    <Formik
                        initialValues={{
                            quantity: Number(""),
                            deliveryInfo: "",


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

                                    onChangeText={handleChange("deliveryInfo")}
                                    value={values.deliveryInfo}
                                    labelColor={activeColor.text}
                                    label="Delivery Info"
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                    multiline
                                />
                                {touched.deliveryInfo && errors.deliveryInfo && (
                                    <InputErrorMessage error={errors.deliveryInfo} />
                                )}

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

                </ScrollView>
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
    },
    label: {
        fontFamily: 'Poppins-Light',
        fontSize: 14
    }

})