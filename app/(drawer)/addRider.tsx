import { useContext, useEffect } from "react";
import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";;
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@tanstack/react-query";

import {
    riderValidationSchema,
} from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import usersApi from "@/api/users";
import { CreateRider } from "@/utils/types";
import { router } from "expo-router";
import { Formik } from "formik";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { SIZES } from "@/constants/Sizes";

const addRider = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];


    const { error, isSuccess, mutate, isPending } = useMutation({
        mutationFn: (rider: CreateRider) => usersApi.vendorAddRider(rider),
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
            router.push("addRider");
        }

        if (isSuccess) {
            showMessage({
                message: "Rider Added.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push("riders");
        }
    }, [error, isSuccess]);

    return (
        < >
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
                            email: "",
                            phoneNumber: "",
                            fullName: "",
                            confirmPassword: "",
                            plateNumber: "",
                            password: "",
                        }}
                        validationSchema={riderValidationSchema}
                        onSubmit={(values, { resetForm }) => mutate(values, { onSuccess: () => resetForm() })}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <>
                                <CustomActivityIndicator visible={isPending} />
                                <View style={{ paddingHorizontal: SIZES.paddingMedium }}>
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
                                        label="Phone Number"
                                        keyboardType="phone-pad"
                                        onChangeText={handleChange("phoneNumber")}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                        value={values.phoneNumber}
                                    />
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <InputErrorMessage error={errors.phoneNumber} />
                                    )}
                                    <CustomTextInput
                                        label="Full Name"
                                        autoCapitalize="words"
                                        onChangeText={handleChange("fullName")}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                        value={values.fullName}
                                    />
                                    {touched.fullName && errors.fullName && (
                                        <InputErrorMessage error={errors.fullName} />
                                    )}
                                    <CustomTextInput
                                        label="Plate Number"
                                        autoCapitalize="characters"
                                        onChangeText={handleChange("plateNumber")}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                        value={values.plateNumber}
                                    />
                                    {touched.plateNumber && errors.plateNumber && (
                                        <InputErrorMessage error={errors.plateNumber} />
                                    )}


                                    <CustomTextInput
                                        label="Password"

                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                        onChangeText={handleChange("password")}
                                        labelColor={activeColor.text}
                                        inputBackgroundColor={activeColor.inputBackground}
                                        inputTextColor={activeColor.text}
                                        value={values.password}
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

                                    <View style={{ marginVertical: 20 }}>
                                        <CustomBtn
                                            btnColor={Colors.btnPrimaryColor}
                                            label="Add Rider"
                                            btnBorderRadius={50}
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
};

export default addRider;

const styles = StyleSheet.create({});
