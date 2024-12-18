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
import { emailValidationSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import userApi from '@/api/users'



const resetPasswordLink = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { mutate, isPending, data } = useMutation({
        mutationFn: (email: string) => userApi.recoverPasswordLink(email),
        onError: (error: Error) => {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.replace("signin");
            return
        },
        onSuccess: (data) => {

            showMessage({
                message: `Reset password link sent to ${data?.email}`,
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.replace("signin");
            return;
        }
    });

    console.log(data)


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
                    initialValues={{ email: "" }}
                    validationSchema={emailValidationSchema}
                    onSubmit={values => mutate(values.email)}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <>
                            <View>
                                <CustomTextInput
                                    label="Email Code"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                    labelColor={activeColor.text}
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                />
                                {touched.email && errors.email && (
                                    <InputErrorMessage error={errors.email} />
                                )}

                                <View style={{ marginVertical: 25 }}>
                                    <CustomBtn
                                        btnColor={Colors.btnPrimaryColor}
                                        label="Send"
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

export default resetPasswordLink;

const styles = StyleSheet.create({});


