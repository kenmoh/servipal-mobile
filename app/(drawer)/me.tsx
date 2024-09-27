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
import { UserProfile } from '@/utils/types';

const updateProfile = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()

    const { mutate, isPending } = useMutation({
        mutationFn: (data: UserProfile) => userApi.createUserProfile(data),

        onSuccess: () => showMessage({
            message: 'Profile updated successfully',
            type: 'success',
            textStyle: {
                textAlign: 'center'
            }
        }),
        onError: (error) => showMessage({
            message: error.message || 'Something went wrong!',
            type: 'danger',
            textStyle: {
                textAlign: 'center'
            }
        })

    })
    const { mutate: update, isPending: updatePending } = useMutation({
        mutationFn: (data: UserProfile) => userApi.updateUserProfile(data),

        onSuccess: () => showMessage({
            message: 'Profile updated successfully',
            type: 'success',
            textStyle: {
                textAlign: 'center'
            }
        }),
        onError: (error) => showMessage({
            message: error.message || 'Something went wrong!',
            type: 'danger',
            textStyle: {
                textAlign: 'center'
            }
        })

    })




    return (
        < >
            <CustomActivityIndicator visible={isPending || updatePending} />
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
                    {
                        user?.bank_account_number ? (<Formik
                            initialValues={{
                                location: user?.location || "",
                                bankAccountNumber: user?.bank_account_number || "",
                                accountHolderName: user?.account_holder_name || "",
                                bankName: user?.bank_name || "",

                            }}
                            validationSchema={userUpdateValidationSchema}
                            onSubmit={update}
                        >
                            {({ handleChange, handleSubmit, values, errors, touched }) => (
                                <>
                                    <View style={{ padding: SIZES.paddingMedium }}>

                                        <CustomTextInput
                                            label="Location"
                                            autoCapitalize="words"
                                            onChangeText={handleChange("location")}
                                            labelColor={activeColor.text}
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                            value={values.location}
                                        />
                                        {touched.location && errors.location && (
                                            <InputErrorMessage error={errors.location} />
                                        )}
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
                                            autoCapitalize="words"

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
                                            autoCapitalize="words"
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
                        ) : (<Formik
                            initialValues={{
                                location: "",
                                bankAccountNumber: "",
                                accountHolderName: "",
                                bankName: "",

                            }}
                            validationSchema={userUpdateValidationSchema}
                            onSubmit={mutate}
                        >
                            {({ handleChange, handleSubmit, values, errors, touched }) => (
                                <>
                                    <View style={{ padding: SIZES.paddingMedium }}>

                                        <CustomTextInput
                                            label="Location"
                                            autoCapitalize="words"
                                            onChangeText={handleChange("location")}
                                            labelColor={activeColor.text}
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                            value={values.location}
                                        />
                                        {touched.location && errors.location && (
                                            <InputErrorMessage error={errors.location} />
                                        )}
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
                                            autoCapitalize="words"

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
                                            autoCapitalize="words"
                                        />
                                        {touched.bankName && errors.bankName && (
                                            <InputErrorMessage error={errors.bankName} />
                                        )}

                                        <View style={{ marginVertical: 25 }}>
                                            <CustomBtn
                                                btnColor={Colors.btnPrimaryColor}
                                                label="Submit"
                                                onPress={handleSubmit}
                                            />
                                        </View>
                                    </View>
                                </>
                            )}
                        </Formik>
                        )
                    }
                </ScrollView>
            </View>
            <StatusBar style={theme.mode === 'dark' ? "light" : 'dark'} backgroundColor={activeColor.background} />

        </>
    );
}

export default updateProfile

const styles = StyleSheet.create({})