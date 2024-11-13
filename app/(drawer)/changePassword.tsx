import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import { Formik } from "formik";

import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { changePasswordSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { ChangePasswordType } from "@/utils/types";
import userApi from '@/api/users'


const changePassword = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { mutate, isPending, data } = useMutation({
        mutationFn: (passwordData: ChangePasswordType) => userApi.updatePassword(passwordData),
        onError: (error: Error) => {
            showMessage({
                message: error.message,
                type: 'danger',
                style: {
                    alignContent: 'center'
                }
            })
        },
        onSuccess: () => {
            showMessage({
                message: "Password changes successfully.",
                type: 'success',
                style: {
                    alignContent: 'center'
                }
            })
            router.back()
        }
    });


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
                    borderRadius: 10,
                    padding: 20,
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
            <StatusBar style="light" backgroundColor={activeColor.background} />
        </View>

    );
};

export default changePassword;



