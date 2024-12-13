// noinspection JSUnusedGlobalSymbols

import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Text} from "react-native";
import { Formik } from "formik";

import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";
import usersApi from "@/api/users";
import { CreateUser } from "@/utils/types";
import {Link, router} from "expo-router";
import { vendorValidationSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@tanstack/react-query";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { SIZES } from "@/constants/Sizes";
import CustomPickerTextInput from "@/components/AppModal";


interface RoleType {
    name: string;
    id: number;
}
const roleData = [
    { id: 1, name: 'Regular User' },
    { id: 2, name: 'Restaurant Service Provider' },
    { id: 3, name: 'Laundry Service Provider' },
    { id: 4, name: 'Dispatch Provider' },
]

const Signup = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { error, isSuccess, mutate, isPending } = useMutation({
        mutationFn: (user: CreateUser) => usersApi.createUser(user),
    });

    if (error) {
        showMessage({
            message: error.message,
            type: "danger",
            style: {
                alignItems: "center",
            },
        });
        router.replace('/sign-up');
    }

    if (isSuccess) {
        showMessage({
            message: "Registration Successful.",
            type: "success",
            style: {
                alignItems: "center",
            },
        });
        router.replace("/(auth)/confirmAccount");
    }

    return (
        < >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                            username: "",
                            email: "",
                            phoneNumber: "",
                            userRole: "",
                            confirmPassword: "",
                            password: "",
                        }}
                        validationSchema={vendorValidationSchema}
                        onSubmit={mutate}
                    >
                        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
                            <>
                                <CustomActivityIndicator visible={isPending} />
                                <View style={{ padding: SIZES.paddingMedium }}>
                                    <CustomTextInput
                                        label="Email"
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        onChangeText={handleChange("email")}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email && (
                                        <InputErrorMessage error={errors.email} />
                                    )}
                                    <CustomTextInput
                                        label="Username"
                                        autoCapitalize="none"
                                        onChangeText={handleChange("username")}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                        value={values.username}
                                    />
                                    {touched.username && errors.username && (
                                        <InputErrorMessage error={errors.username} />
                                    )}
                                    <CustomTextInput
                                        label="Phone Number"
                                        keyboardType="phone-pad"
                                        onChangeText={handleChange("phoneNumber")}
                                        value={values.phoneNumber}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                    />
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <InputErrorMessage error={errors.phoneNumber} />
                                    )}
                                    <CustomPickerTextInput
                                        label="Select Role"
                                        categories={roleData}
                                        onSelect={(role: RoleType) =>
                                            setFieldValue("userRole", role.name)
                                        }
                                    />
                                    {touched.userRole && errors.userRole && (
                                        <InputErrorMessage error={errors.userRole} />
                                    )}
                                    <CustomTextInput
                                        label="Password"
                                        secureTextEntry={true}
                                        onChangeText={handleChange("password")}
                                        value={values.password}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                    />
                                    {touched.password && errors.password && (
                                        <InputErrorMessage error={errors.password} />
                                    )}
                                    <CustomTextInput
                                        label="Confirm Passord"
                                        secureTextEntry={true}
                                        onChangeText={handleChange("confirmPassword")}
                                        value={values.confirmPassword}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <InputErrorMessage error={errors.confirmPassword} />
                                    )}

                                    <View style={{ marginVertical: 25 }}>
                                        <CustomBtn
                                            btnColor={Colors.btnPrimaryColor}
                                            label="Sign Up"

                                            onPress={handleSubmit}
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <Text style={[styles.text, { color: activeColor.text }]}>Have an account?</Text>
                        <Link href={'/sign-in'} style={[styles.text, { color: 'skyblue' }]}>Login</Link>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <StatusBar style={theme.mode === 'dark' ? "light" : 'dark'} backgroundColor={activeColor.background} />

        </>
    );
};

export default Signup;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14
    }
});