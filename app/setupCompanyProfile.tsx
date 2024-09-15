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
import storage from "@/auth/storage";
import { useAuth } from "@/auth/authContext";
import { router } from "expo-router";


export type ProfileType = {
    openingHour: string;
    closingHour: string;
    image: string
    companyName: string
};
const SetupCompanyProfile = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { setOpeningHour, openingHour } = useAuth();
    const [showOpeningHour, setShowOpeningHour] = useState(false);
    const [showClosingHour, setShowClosingHour] = useState(false);

    const { error, isSuccess, mutate, isPending, data, } = useMutation({
        mutationFn: (profile: ProfileType) => userApi.setupCompanyProfile(profile),
    });

    useEffect(() => {
        if (error) {
            showMessage({
                message: error.message || 'Something went wrong, please try again!',
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
        }
        if (isSuccess) {
            storage.storeProfile(data)
            setOpeningHour(storage.getProfile())
            showMessage({
                message: "Profile Updated!",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.back()
        }
    }, [error, isSuccess, data]);
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
                            openingHour: openingHour?.opening_hour || "",
                            closingHour: openingHour?.closing_hour || "",
                            companyName: openingHour?.vendor_company_name || "",
                            image: "",
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
                                        <CustomTextInput
                                            onChangeText={handleChange("companyName")}
                                            value={values.companyName}
                                            labelColor={activeColor.text}
                                            label="Company Name"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                        />
                                        {touched.companyName && errors.companyName && (
                                            <InputErrorMessage error={errors.companyName} />
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
                                        <View>
                                            <Text style={{ fontSize: 14, marginTop: 10, color: activeColor.text, fontFamily: "Poppins-Medium" }}>Barner</Text>
                                            <ImagePickerForm field={"image"} height={150} width={'100%'} />
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
                                {showOpeningHour && (
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
                                {showClosingHour && (
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
