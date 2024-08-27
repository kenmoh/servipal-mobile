import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

import AccountLinkText from "@/components/AcountLink";
import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";
import TitleText from "@/components/TitleText";
import authApi from "@/api/auth";
import { Login, UserReturn } from "@/utils/types";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import { Formik } from "formik";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { changePasswordSchema, loginValidationSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import authStorage from '@/auth/storage'
import { SIZES } from "@/constants/Sizes";

type ChangePasswordType = {
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}

const ChangePassword = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const authContext = useAuth();

    const { error, isSuccess, mutate, isPending, data } = useMutation({
        mutationFn: ({ oldPassword, newPassword, confirmNewPassword }: ChangePasswordType) => { },
    });


    useEffect(() => {
        if (error) {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.replace("signin");

        }
    }, [error])

    useEffect(() => {
        if (isSuccess) {
            const user = jwtDecode(data?.access_token) as UserReturn;

            if (user?.account_status === 'confirmed') {
                authContext.setUser(user);
                authStorage.storeToken(data.access_token);
            }
            if (user?.account_status === 'pending') {
                showMessage({
                    message: "Please verify your email and phone number.",
                    type: "danger",
                    style: {
                        alignItems: "center",
                    },
                });
                router.replace("confirmAccount");
                return;
            }
            showMessage({
                message: "Login Successful.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.replace("(tabs)/topTab");
            return;
        }
    }, [isSuccess, data])


    return (

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
                    padding: SIZES.paddingMedium,
                    backgroundColor: activeColor.background,
                }}
            >

                <Formik
                    initialValues={{ oldPassword: "", newPassword: "", confirmNewPassword: '' }}
                    validationSchema={changePasswordSchema}
                    onSubmit={mutate}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <>
                            <View>

                                <CustomTextInput
                                    label="Old Password"
                                    hasBorder={theme.mode !== "dark"}
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={handleChange("oldPassword")}
                                    value={values.oldPassword}
                                    labelColor={activeColor.text}
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                />
                                {touched.oldPassword && errors.oldPassword && (
                                    <InputErrorMessage error={errors.oldPassword} />
                                )}
                                <CustomTextInput
                                    label="New Password"

                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={handleChange("newPassword")}
                                    value={values.newPassword}
                                    labelColor={activeColor.text}
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                />
                                {touched.newPassword && errors.newPassword && (
                                    <InputErrorMessage error={errors.newPassword} />
                                )}
                                <CustomTextInput
                                    label="Confirm New Password"

                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={handleChange("confirmNewPassword")}
                                    value={values.confirmNewPassword}
                                    labelColor={activeColor.text}
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                />
                                {touched.confirmNewPassword && errors.confirmNewPassword && (
                                    <InputErrorMessage error={errors.confirmNewPassword} />
                                )}

                                <View style={{ marginVertical: 25 }}>
                                    <CustomBtn
                                        btnColor={Colors.btnPrimaryColor}
                                        label="Submit"
                                        btnBorderRadius={50}

                                        onPress={handleSubmit}
                                    />
                                </View>
                            </View>
                        </>
                    )}
                </Formik>
            </View>

            <StatusBar style={theme.mode === 'dark' ? "light" : 'dark'} backgroundColor={activeColor.background} />
        </View>

    );
};

export default ChangePassword;

const styles = StyleSheet.create({});


