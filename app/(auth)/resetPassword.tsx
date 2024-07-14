import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import { Formik } from "formik";
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { changePasswordSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";


type ChangePasswordType = {
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}

const resetPassword = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    Linking.useURL()
    const { error, isSuccess, mutate, isPending, data } = useMutation({
        mutationFn: ({ oldPassword, newPassword, confirmNewPassword }: ChangePasswordType) => { },
    });






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
                                        hasBorder={theme.mode !== "dark"}
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
                                        hasBorder={theme.mode !== "dark"}
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
    );
};

export default resetPassword;

const styles = StyleSheet.create({});


