import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import CustomBtn from '@/components/CustomBtn';
import { useMutation } from '@tanstack/react-query';
import InputErrorMessage from '@/components/InputErrorMessage';
import CustomTextInput from '@/components/CustomTextInput';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import { Formik } from 'formik';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { SIZES } from '@/constants/Sizes';
import { userUpdateValidationSchema } from '@/utils/validations';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/auth/authContext';
import userApi from '@/api/users'
import { showMessage } from 'react-native-flash-message';
import { UpdateUser } from '@/utils/types';

const me = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()

    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationFn: (data: UpdateUser) => userApi.updateUser(data),

    })


    useEffect(() => {
        if (isSuccess) {
            showMessage({
                message: 'Profile updated successfully',
                type: 'success',
                textStyle: {
                    textAlign: 'center'
                }
            })
        }
        if (error) {
            showMessage({
                message: error.message || 'Something went wrong!',
                type: 'danger',
                textStyle: {
                    textAlign: 'center'
                }
            })
        }
    }, [error, isSuccess])
    return (
        < >
            <CustomActivityIndicator visible={isPending} />
            <View
                style={{
                    backgroundColor: activeColor.background,
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        width: "100%",
                        backgroundColor: activeColor.background,
                    }}
                >
                    <Formik
                        initialValues={{
                            fullName: user?.full_name ? user.full_name : "",
                            companyRegNum: user?.company_reg_number ? user.company_reg_number : "",
                            bankAccountNumber: user?.account_number ? user.account_number : "",
                            accountHolderName: user?.account_holder_name ? user.account_holder_name : "",
                            bankName: user?.bank_name ? user.bank_name : "",

                        }}
                        validationSchema={userUpdateValidationSchema}
                        onSubmit={mutate}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <>
                                <View style={{ padding: SIZES.paddingMedium }}>
                                    {
                                        user?.user_type === 'vendor' && (
                                            <>
                                                <CustomTextInput
                                                    label="Full Name"
                                                    autoCapitalize="word"
                                                    onChangeText={handleChange("fullName")}
                                                    labelColor={activeColor.text}
                                                    inputBackgroundColor={activeColor.inputBackground}
                                                    inputTextColor={activeColor.text}
                                                    value={values.fullName}
                                                />
                                                {touched.fullName && errors.fullName && (
                                                    <InputErrorMessage error={errors.fullName} />
                                                )}
                                            </>
                                        )
                                    }
                                    {
                                        user?.user_type === 'dispatcher' && (
                                            <>
                                                <CustomTextInput
                                                    label="Company Reg. Number"
                                                    editable={false}
                                                    onChangeText={handleChange("companyRegNum")}
                                                    value={values.companyRegNum}
                                                    labelColor={activeColor.text}
                                                    inputBackgroundColor={activeColor.inputBackground}
                                                    inputTextColor={activeColor.text}
                                                />
                                                {touched.companyRegNum && errors.companyRegNum && (
                                                    <InputErrorMessage error={errors.companyRegNum} />
                                                )}
                                            </>
                                        )
                                    }
                                    <CustomTextInput
                                        label="Account Number"
                                        onChangeText={handleChange("bankAccountNumber")}
                                        value={values.bankAccountNumber}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                        keyboardType='number-pad'
                                    />
                                    {touched.bankAccountNumber && errors.bankAccountNumber && (
                                        <InputErrorMessage error={errors.bankAccountNumber} />
                                    )}
                                    <CustomTextInput
                                        label="Account Holder Name"
                                        onChangeText={handleChange("accountHolderName")}
                                        value={values.accountHolderName}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                        autoCapitalize="word"

                                    />
                                    {touched.accountHolderName && errors.accountHolderName && (
                                        <InputErrorMessage error={errors.accountHolderName} />
                                    )}
                                    <CustomTextInput
                                        label="Bank name"
                                        onChangeText={handleChange("bankName")}
                                        value={values.bankName}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                    />
                                    {touched.bankName && errors.bankName && (
                                        <InputErrorMessage error={errors.bankName} />
                                    )}

                                    <View style={{ marginVertical: 25 }}>
                                        <CustomBtn
                                            btnColor={Colors.btnPrimaryColor}
                                            label="Update"
                                            onPress={handleSubmit}
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>

                </ScrollView>
            </View>
            <StatusBar style={theme.mode === 'dark' ? "light" : 'dark'} backgroundColor={activeColor.background} />

        </>
    );
}

export default me

const styles = StyleSheet.create({})