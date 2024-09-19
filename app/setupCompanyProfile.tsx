import { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import DateTimePicker from '@react-native-community/datetimepicker';

import CustomBtn from "@/components/CustomBtn";
import { Colors } from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { SetupCompanyValidation } from "@/utils/orderValidation";
import InputErrorMessage from "@/components/InputErrorMessage";
import { ThemeContext } from "@/context/themeContext";
import userApi from '@/api/users'
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import ImagePickerForm from "@/components/ImageFormPicker";
import { router } from "expo-router";
import { SetupCompany } from "@/utils/types";
import { useAuth } from "@/auth/authContext";

type ErrorType = {
    detail: string
}

type ProfileType = {
    user_id: string,
    location: string,
    company_name: string,
    company_background_image: string,
    profile_image: string,
    opening_hour: string,
    closing_hour: string,
    bank_account_number: string,
    account_holder_name: string,
    bank_name: string,
    company_reg_number: string
};

export type ProfileReturnType = {
    data: ProfileType | ErrorType
}



const SetupCompanyProfile = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()

    const [showOpeningHour, setShowOpeningHour] = useState(false);
    const [showClosingHour, setShowClosingHour] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: (profile: SetupCompany) => userApi.setupCompanyProfile(profile),
        onSuccess: () => {
            showMessage({
                message: 'Profile Updated!',
                type: "success",
                style: {
                    alignItems: "center",
                },

            });
            router.push('(restaurant)/addMeal')
        },
        onError: (error) => showMessage({
            message: error.message || 'Something went wrong, please try again!',
            type: "danger",
            style: {
                alignItems: "center",
            },
        })
    });


    return (
        <View
            style={{
                backgroundColor: activeColor.background,
                flex: 1,
                justifyContent: "center",
            }}
        >
            <CustomActivityIndicator visible={isPending} />
            <StatusBar style="inverted" />
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Formik
                        initialValues={{
                            openingHour: "",
                            closingHour: "",
                            companyName: "",
                            location: "",
                            accountHolderName: '',
                            bankName: '',
                            accountNumber: '',
                            companyRegNum: '',
                            backgroundImage: '',
                            profileImage: ''
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
                            setFieldValue

                        }) => (
                            <>

                                <View style={styles.container}>
                                    <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                        {user?.user_type !== 'user' && <CustomTextInput
                                            onChangeText={handleChange("companyName")}
                                            value={values.companyName}
                                            labelColor={activeColor.text}
                                            label="Company Name"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                        />}
                                        {touched.companyName && errors.companyName && (
                                            <InputErrorMessage error={errors.companyName} />
                                        )}
                                        {user?.user_type !== 'user' && <CustomTextInput
                                            onChangeText={handleChange("companyRegNum")}
                                            value={values.companyRegNum}
                                            labelColor={activeColor.text}
                                            label="Company Reg. Number"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                        />}
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
                                        />
                                        {touched.accountHolderName && errors.accountHolderName && (
                                            <InputErrorMessage error={errors.accountHolderName} />
                                        )}
                                        <CustomTextInput
                                            onChangeText={handleChange("bankName")}
                                            value={values.bankName}
                                            labelColor={activeColor.text}
                                            label="Bank Name"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                        />
                                        {touched.bankName && errors.bankName && (
                                            <InputErrorMessage error={errors.bankName} />
                                        )}


                                        {user?.user_type !== 'user' && <CustomTextInput
                                            onChangeText={handleChange("openingHour")}
                                            value={values.openingHour}
                                            labelColor={activeColor.text}
                                            label="Opening Hour"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                            onPress={() => setShowOpeningHour(true)}

                                        />}
                                        {touched.openingHour && errors.openingHour && (
                                            <InputErrorMessage error={errors.openingHour} />
                                        )}
                                        {user?.user_type !== 'user' && <CustomTextInput
                                            onChangeText={handleChange("closingHour")}
                                            value={values.closingHour}
                                            labelColor={activeColor.text}
                                            label="Closing Hour"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                            onPress={() => setShowClosingHour(true)}
                                        />}
                                        {touched.closingHour && errors.closingHour && (
                                            <InputErrorMessage error={errors.closingHour} />
                                        )}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                            <View>
                                                <Text style={{ fontSize: 14, marginTop: 10, color: activeColor.text, fontFamily: "Poppins-Medium" }}>Profile Image</Text>
                                                <ImagePickerForm field={"profileImage"} height={150} width={'100%'} />
                                            </View>
                                            {user?.user_type !== 'user' && <View>
                                                <Text style={{ fontSize: 14, marginTop: 10, color: activeColor.text, fontFamily: "Poppins-Medium" }}>Background Barner</Text>
                                                <ImagePickerForm field={"backgroundImage"} height={150} width={'100%'} />
                                            </View>}
                                        </View>
                                        <View style={styles.btnContainer}>
                                            <CustomBtn
                                                label="submit"
                                                btnColor="orange"
                                                onPress={handleSubmit}
                                            />
                                        </View>

                                    </View>
                                </View>
                                {user?.user_type !== 'user' && showOpeningHour && (
                                    <DateTimePicker
                                        testID="openinHourPicker"
                                        value={values.openingHour ? new Date(`1970-01-01T${values.openingHour}`) : new Date()}
                                        mode="time"
                                        is24Hour={true}
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowOpeningHour(Platform.OS === 'ios');
                                            if (selectedDate) {
                                                const formattedTime = selectedDate.toTimeString().split(' ')[0];
                                                setFieldValue('openingHour', formattedTime);
                                            }

                                        }}
                                    />
                                )}
                                {user?.user_type !== 'user' && showClosingHour && (
                                    <DateTimePicker
                                        testID="closingHourPicker"
                                        value={values.closingHour ? new Date(`1970-01-01T${values.closingHour}`) : new Date()}
                                        mode="time"
                                        is24Hour={true}
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowClosingHour(Platform.OS === 'ios');
                                            if (selectedDate) {
                                                const formattedTime = selectedDate.toTimeString().split(' ')[0];
                                                setFieldValue('closingHour', formattedTime);
                                            }

                                        }}

                                    />
                                )}



                            </>
                        )}
                    </Formik>
                </ScrollView>
            </View>
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
