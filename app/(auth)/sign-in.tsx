// noinspection JSUnusedGlobalSymbols

import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";
import authApi from "@/api/auth";
import { Login, UserReturn } from "@/utils/types";
import { showMessage } from "react-native-flash-message";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { loginValidationSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import authStorage from '@/auth/storage'
import { SIZES } from "@/constants/Sizes";
import { useAuth } from "@/auth/authContext";


const SignIn = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const authContext = useAuth();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ username, password }: Login) => authApi.loginApi(username, password),
        onError: (error) => {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.replace('/sign-in');

        },
        onSuccess: async (data) => {
            const user = jwtDecode(data?.access_token) as UserReturn;

            if (user?.account_status === 'confirmed') {
                authContext.setUser(user);
                await authStorage.storeToken(data?.access_token);
            }
            if (user?.account_status === 'pending') {
                showMessage({
                    message: "Please verify your email and phone number.",
                    type: "danger",
                    style: {
                        alignItems: "center",
                    },
                });
                router.replace("/(auth)/confirmAccount");
                return;
            }
            showMessage({
                message: "Login Successful.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.replace("/(drawer)/(tabs)");
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
                    backgroundColor: activeColor.background,
                    paddingHorizontal: SIZES.paddingMedium
                }}
            >
                {/* <TitleText label="Sign In" textColor={activeColor.text} /> */}
                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={loginValidationSchema}
                    onSubmit={mutate}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <>
                            <View>
                                <CustomTextInput
                                    label="Email"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onChangeText={handleChange("username")}
                                    value={values.username}
                                    labelColor={activeColor.text}

                                />
                                {touched.username && errors.username && (
                                    <InputErrorMessage error={errors.username} />
                                )}
                                <CustomTextInput
                                    label="Password"
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    labelColor={activeColor.text}
                                />
                                {touched.password && errors.password && (
                                    <InputErrorMessage error={errors.password} />
                                )}
                                <Link href={"/(auth)/resetPasswordLink"} style={{ alignSelf: 'flex-end', color: activeColor.icon }}>
                                    Forgot Password?
                                </Link>
                                <View style={{ marginVertical: 25 }}>
                                    <CustomBtn
                                        btnColor={Colors.btnPrimaryColor}
                                        label="Login"
                                        onPress={handleSubmit}
                                    />
                                </View>
                                <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                    <Text style={[styles.text, { color: activeColor.text }]}>Don't have an account?</Text>
                                    <Link href={'/sign-up'} style={[styles.text, { color: 'skyblue' }]}>Register</Link>

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

export default SignIn;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14
    }
});

