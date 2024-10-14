import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import { useMutation } from "@tanstack/react-query";

import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";
import { Dispute } from "@/utils/types";
import { showMessage } from "react-native-flash-message";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { DisputeValidation } from "@/utils/orderValidation";
import orderApi from '@/api/orders'
import CustomPickerTextInput from "@/components/AppModal";

interface RoleType {
    name: string;
    id: number;
}
const roleData = [
    { id: 1, name: 'Regular User' },
    { id: 2, name: 'Restaurant Service Provider' },
    { id: 3, name: 'Laundry Service Provider' },
    { id: 4, name: 'Rider' },
]

const confirmAccount = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { orderNumber, orderId } = useLocalSearchParams()

    const { mutate, isPending } = useMutation({
        mutationFn: (order: Dispute) => orderApi.openDispute(orderId as string, order),
        onError: (error) => {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
        },
        onSuccess: () => {
            showMessage({
                message: `Dispute raised on order #${orderNumber}. We'll look into it and get back to you shortly.`,
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.back();

        }
    });




    return (
        <ScrollView style={{ flex: 1, backgroundColor: activeColor.background, }}>

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
                    initialValues={{ subject: "", content: "", disputedUser: "", }}
                    validationSchema={DisputeValidation}
                    onSubmit={mutate}
                >
                    {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <View>
                                <CustomTextInput
                                    label="Subject"
                                    onChangeText={handleChange("subject")}
                                    value={values.subject}
                                    labelColor={activeColor.text}
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                    borderRadius={10}
                                />
                                {touched.subject && errors.subject && (
                                    <InputErrorMessage error={errors.subject} />
                                )}
                                <CustomPickerTextInput
                                    label="User Role"
                                    categories={roleData}
                                    borderRadius={10}
                                    onSelect={(role: RoleType) =>
                                        setFieldValue("disputedUser", role.name)
                                    }
                                />
                                {touched.disputedUser && errors.disputedUser && (
                                    <InputErrorMessage error={errors.disputedUser} />
                                )}
                                <CustomTextInput
                                    label="Content"
                                    onChangeText={handleChange("content")}
                                    value={values.content}
                                    labelColor={activeColor.text}
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                    multiline
                                    inputHeight={100}
                                    borderRadius={10}

                                />
                                {touched.content && errors.content && (
                                    <InputErrorMessage error={errors.content} />
                                )}
                                <View style={{ marginVertical: 25 }}>
                                    <CustomBtn
                                        btnColor={Colors.btnPrimaryColor}
                                        label="Send"
                                        btnBorderRadius={10}
                                        onPress={handleSubmit}
                                    />
                                </View>
                            </View>
                        </>
                    )}
                </Formik>
            </View>


            <StatusBar style="light" backgroundColor={activeColor.background} />
        </ScrollView>
    );
};

export default confirmAccount;

const styles = StyleSheet.create({});


