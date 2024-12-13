import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";

import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";
import TitleText from "@/components/TitleText";
import { ConfirmAccount } from "@/utils/types";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import { Formik } from "formik";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { accountValidationSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import userApi from '@/api/users'

const confirmAccount = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { error, isSuccess, mutate, isPending, data } = useMutation({
        mutationFn: ({ emailCode, phoneCode }: ConfirmAccount) => userApi.confirmAccount(emailCode, phoneCode),
        onError: (error) => {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.replace("confirmAccount");
            return
        },
        onSuccess: () => {
            showMessage({
                message: "Congratulations! Account created.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.replace("signin");
            return;
        }
    });




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: activeColor.background, }}>

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
                    initialValues={{ emailCode: "", phoneCode: "" }}
                    validationSchema={accountValidationSchema}
                    onSubmit={mutate}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <>
                            <View>
                                <CustomTextInput
                                    label="Email Code"
                                    keyboardType="number-pad"
                                    onChangeText={handleChange("emailCode")}
                                    value={values.emailCode}
                                    labelColor={activeColor.text}
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                />
                                {touched.emailCode && errors.emailCode && (
                                    <InputErrorMessage error={errors.emailCode} />
                                )}
                                <CustomTextInput
                                    label="Phone Code"
                                    keyboardType="number-pad"

                                    onChangeText={handleChange("phoneCode")}
                                    value={values.phoneCode}
                                    labelColor={activeColor.text}
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                />
                                {touched.phoneCode && errors.phoneCode && (
                                    <InputErrorMessage error={errors.phoneCode} />
                                )}
                                <View style={{ marginVertical: 25 }}>
                                    <CustomBtn
                                        btnColor={Colors.btnPrimaryColor}
                                        label="Send"

                                        onPress={handleSubmit}
                                    />
                                </View>
                            </View>
                        </>
                    )}
                </Formik>
            </View>


            <StatusBar style="light" backgroundColor={activeColor.background} />
        </SafeAreaView>
    );
};

export default confirmAccount;

const styles = StyleSheet.create({});


