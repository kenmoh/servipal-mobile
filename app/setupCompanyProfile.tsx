import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import DateTimePicker from "@react-native-community/datetimepicker";

import CustomBtn from "@/components/CustomBtn";
import { Colors } from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { SetupCompanyValidation } from "@/utils/orderValidation";
import InputErrorMessage from "@/components/InputErrorMessage";
import { ThemeContext } from "@/context/themeContext";
import userApi from "@/api/users";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import ImagePickerForm from "@/components/ImageFormPicker";
import { router } from "expo-router";
import { SetupCompany } from "@/utils/types";
import { useAuth } from "@/auth/authContext";

type ErrorType = {
    detail: string;
};

type ProfileType = {
    user_id: string;
    location: string;
    company_name: string;
    company_background_image: string;
    profile_image: string;
    opening_hour: string;
    closing_hour: string;
    bank_account_number: string;
    account_holder_name: string;
    bank_name: string;
    company_reg_number: string;
};

export type ProfileReturnType = {
    data: ProfileType | ErrorType;
};

const SetupCompanyProfile = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();

    const [showOpeningHour, setShowOpeningHour] = useState(false);
    const [showClosingHour, setShowClosingHour] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: (profile: SetupCompany) => userApi.setupCompanyProfile(profile),
        onSuccess: () => {
            showMessage({
                message: "Profile Updated!",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push(
                user?.user_type === "Restaurant Service Provider"
                    ? `(restaurant)/${user?.id}`
                    : user?.user_type === "Laundry Service Provider"
                        ? `(laundry)/${user?.id}`
                        : "topTap"
            );
        },
        onError: (error) =>
            showMessage({
                message: error.message || "Something went wrong, please try again!",
                type: "danger",
                style: {
                    alignItems: "center",
                },
            }),
    });
    const { mutate: update, isPending: isUpdating } = useMutation({
        mutationFn: (profile: SetupCompany) =>
            userApi.updateCompanyProfile(profile),
        onSuccess: () => {
            showMessage({
                message: "Profile Updated!",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push("topTab");
        },
        onError: (error) =>
            showMessage({
                message: error.message || "Something went wrong, please try again!",
                type: "danger",
                style: {
                    alignItems: "center",
                },
            }),
    });

    return (
        <View
            style={{
                backgroundColor: activeColor.background,
                flex: 1,
                justifyContent: "center",
            }}
        >
            <CustomActivityIndicator visible={isPending || isUpdating} />
            <StatusBar style="inverted" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainContainer}>
                    {user?.bank_account_number ? (
                        <Formik
                            initialValues={{
                                openingHour: user?.opening_hour || "",
                                closingHour: user?.closing_hour || "",
                                companyName: user?.company_name || "",
                                location: user?.location || "",
                                accountHolderName: user?.account_holder_name || "",
                                bankName: user?.bank_name || "",
                                accountNumber: user?.bank_account_number || "",
                                companyRegNum: user?.company_reg_number || "",
                            }}
                            onSubmit={(values, { resetForm }) =>
                                update(values, { onSuccess: () => resetForm() })
                            }
                            validationSchema={SetupCompanyValidation}
                        >
                            {({
                                handleChange,
                                handleSubmit,
                                values,
                                errors,
                                touched,
                                setFieldValue,
                            }) => (
                                <>
                                    <View style={styles.container}>
                                        <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                            <CustomTextInput
                                                onChangeText={handleChange("companyName")}
                                                value={values.companyName}
                                                labelColor={activeColor.text}
                                                label="Company Name"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                autoCapitalize="words"
                                            // editable={user?.company_name === '' ? true : false}
                                            />
                                            {touched.companyName && errors.companyName && (
                                                <InputErrorMessage error={errors.companyName} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("companyRegNum")}
                                                value={values.companyRegNum}
                                                labelColor={activeColor.text}
                                                label="Company Reg. Number"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                autoCapitalize="characters"
                                            />
                                            {touched.companyRegNum && errors.companyRegNum && (
                                                <InputErrorMessage error={errors.companyRegNum} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("location")}
                                                value={values.location}
                                                labelColor={activeColor.text}
                                                label="Location"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                            />
                                            {touched.location && errors.location && (
                                                <InputErrorMessage error={errors.location} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("accountNumber")}
                                                value={values.accountNumber}
                                                labelColor={activeColor.text}
                                                label="Bank Account Number"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                keyboardType="numeric"
                                            />
                                            {touched.accountNumber && errors.accountNumber && (
                                                <InputErrorMessage error={errors.accountNumber} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("accountHolderName")}
                                                value={values.accountHolderName}
                                                labelColor={activeColor.text}
                                                label="Account Holder Name"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                autoCapitalize="words"
                                            />
                                            {touched.accountHolderName &&
                                                errors.accountHolderName && (
                                                    <InputErrorMessage error={errors.accountHolderName} />
                                                )}
                                            <CustomTextInput
                                                onChangeText={handleChange("bankName")}
                                                value={values.bankName}
                                                labelColor={activeColor.text}
                                                label="Bank Name"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                autoCapitalize="words"
                                            />
                                            {touched.bankName && errors.bankName && (
                                                <InputErrorMessage error={errors.bankName} />
                                            )}

                                            <CustomTextInput
                                                onChangeText={handleChange("openingHour")}
                                                value={values.openingHour}
                                                labelColor={activeColor.text}
                                                label="Opening Hour"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                onPress={() => setShowOpeningHour(true)}
                                            />
                                            {touched.openingHour && errors.openingHour && (
                                                <InputErrorMessage error={errors.openingHour} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("closingHour")}
                                                value={values.closingHour}
                                                labelColor={activeColor.text}
                                                label="Closing Hour"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                onPress={() => setShowClosingHour(true)}
                                            />
                                            {touched.closingHour && errors.closingHour && (
                                                <InputErrorMessage error={errors.closingHour} />
                                            )}

                                            <View style={styles.btnContainer}>
                                                <CustomBtn
                                                    label="Update"
                                                    btnColor="orange"
                                                    onPress={handleSubmit}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    {showOpeningHour && (
                                        <DateTimePicker
                                            testID="openinHourPicker"
                                            value={
                                                values.openingHour
                                                    ? new Date(`1970-01-01T${values.openingHour}`)
                                                    : new Date()
                                            }
                                            mode="time"
                                            is24Hour={true}
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                setShowOpeningHour(Platform.OS === "ios");
                                                if (selectedDate) {
                                                    const formattedTime = selectedDate
                                                        .toTimeString()
                                                        .split(" ")[0];
                                                    setFieldValue("openingHour", formattedTime);
                                                }
                                            }}
                                        />
                                    )}
                                    {showClosingHour && (
                                        <DateTimePicker
                                            testID="closingHourPicker"
                                            value={
                                                values.closingHour
                                                    ? new Date(`1970-01-01T${values.closingHour}`)
                                                    : new Date()
                                            }
                                            mode="time"
                                            is24Hour={true}
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                setShowClosingHour(Platform.OS === "ios");
                                                if (selectedDate) {
                                                    const formattedTime = selectedDate
                                                        .toTimeString()
                                                        .split(" ")[0];
                                                    setFieldValue("closingHour", formattedTime);
                                                }
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </Formik>
                    ) : (
                        <Formik
                            initialValues={{
                                openingHour: "",
                                closingHour: "",
                                companyName: "",
                                location: "",
                                accountHolderName: "",
                                bankName: "",
                                accountNumber: "",
                                companyRegNum: "",
                            }}
                            onSubmit={(values, { resetForm }) =>
                                mutate(values, { onSuccess: () => resetForm() })
                            }
                            validationSchema={SetupCompanyValidation}
                        >
                            {({
                                handleChange,
                                handleSubmit,
                                values,
                                errors,
                                touched,
                                setFieldValue,
                            }) => (
                                <>
                                    <View style={styles.container}>
                                        <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                            <CustomTextInput
                                                onChangeText={handleChange("companyName")}
                                                value={values.companyName}
                                                labelColor={activeColor.text}
                                                label="Company Name"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                autoCapitalize="words"
                                            // editable={user?.company_name === '' ? true : false}
                                            />
                                            {touched.companyName && errors.companyName && (
                                                <InputErrorMessage error={errors.companyName} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("companyRegNum")}
                                                value={values.companyRegNum}
                                                labelColor={activeColor.text}
                                                label="Company Reg. Number"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                autoCapitalize="characters"
                                            />
                                            {touched.companyRegNum && errors.companyRegNum && (
                                                <InputErrorMessage error={errors.companyRegNum} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("location")}
                                                value={values.location}
                                                labelColor={activeColor.text}
                                                label="Location"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                            />
                                            {touched.location && errors.location && (
                                                <InputErrorMessage error={errors.location} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("accountNumber")}
                                                value={values.accountNumber}
                                                labelColor={activeColor.text}
                                                label="Bank Account Number"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                keyboardType="numeric"
                                            />
                                            {touched.accountNumber && errors.accountNumber && (
                                                <InputErrorMessage error={errors.accountNumber} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("accountHolderName")}
                                                value={values.accountHolderName}
                                                labelColor={activeColor.text}
                                                label="Account Holder Name"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                autoCapitalize="words"
                                            />
                                            {touched.accountHolderName &&
                                                errors.accountHolderName && (
                                                    <InputErrorMessage error={errors.accountHolderName} />
                                                )}
                                            <CustomTextInput
                                                onChangeText={handleChange("bankName")}
                                                value={values.bankName}
                                                labelColor={activeColor.text}
                                                label="Bank Name"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                autoCapitalize="words"
                                            />
                                            {touched.bankName && errors.bankName && (
                                                <InputErrorMessage error={errors.bankName} />
                                            )}

                                            <CustomTextInput
                                                onChangeText={handleChange("openingHour")}
                                                value={values.openingHour}
                                                labelColor={activeColor.text}
                                                label="Opening Hour"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                onPress={() => setShowOpeningHour(true)}
                                            />
                                            {touched.openingHour && errors.openingHour && (
                                                <InputErrorMessage error={errors.openingHour} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("closingHour")}
                                                value={values.closingHour}
                                                labelColor={activeColor.text}
                                                label="Closing Hour"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                onPress={() => setShowClosingHour(true)}
                                            />
                                            {touched.closingHour && errors.closingHour && (
                                                <InputErrorMessage error={errors.closingHour} />
                                            )}

                                            <View style={styles.btnContainer}>
                                                <CustomBtn
                                                    label="submit"
                                                    btnColor="orange"
                                                    onPress={handleSubmit}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    {showOpeningHour && (
                                        <DateTimePicker
                                            testID="openinHourPicker"
                                            value={
                                                values.openingHour && !isNaN(new Date(`1970-01-01T${values.openingHour}`).getTime())
                                                    ? new Date(`1970-01-01T${values.openingHour}`)
                                                    : new Date()
                                            }
                                            mode="time"
                                            is24Hour={true}
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                setShowOpeningHour(Platform.OS === "ios");
                                                if (selectedDate) {
                                                    const formattedTime = selectedDate
                                                        .toTimeString()
                                                        .split(" ")[0];
                                                    setFieldValue("openingHour", formattedTime);
                                                }
                                            }}
                                        />
                                    )}
                                    {showClosingHour && (
                                        <DateTimePicker
                                            testID="closingHourPicker"
                                            value={
                                                values.closingHour && !isNaN(new Date(`1970-01-01T${values.closingHour}`).getTime())
                                                    ? new Date(`1970-01-01T${values.closingHour}`)
                                                    : new Date()
                                            }
                                            mode="time"
                                            is24Hour={true}
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                setShowClosingHour(Platform.OS === "ios");
                                                if (selectedDate) {
                                                    const formattedTime = selectedDate
                                                        .toTimeString()
                                                        .split(" ")[0];
                                                    setFieldValue("closingHour", formattedTime);
                                                }
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </Formik>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default SetupCompanyProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
    },
    text: {
        fontSize: 16,
        color: "gray",
        marginVertical: 10,
        textTransform: "uppercase",
        fontFamily: "Poppins-Regular",
    },
    btnContainer: {
        marginVertical: 20,
    },
});
