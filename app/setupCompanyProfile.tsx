import { useContext, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";

import CustomBtn from "@/components/CustomBtn";
import { Colors } from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { SetupCompanyValidation } from "@/utils/orderValidation";
import InputErrorMessage from "@/components/InputErrorMessage";
import { ThemeContext } from "@/context/themeContext";
import userApi from '@/api/users'
import CustomActivityIndicator from "@/components/CustomActivityIndicator";


type ProfileType = {
    openingHour: string;
    closingHour: string;
    image: string
};
const SetupCompanyProfile = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { error, isSuccess, mutate, isPending, data } = useMutation({
        mutationFn: ({ profile }: { profile: ProfileType }) => userApi.setupCompanyProfile(profile),
    });

    console.log(data)


    useEffect(() => {
        if (error) {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
        }
        if (isSuccess) {
            showMessage({
                message: "Meal added successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
        }
    }, [error, isSuccess]);
    return (
        <View
            style={{
                backgroundColor: activeColor.background,
                flex: 1,
                justifyContent: "center",
            }}
        >
            <Text>Setup company profile image, opening and closing hours.</Text>
            <CustomActivityIndicator visible={isPending} />
            <StatusBar style="inverted" />
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Formik
                        initialValues={{
                            openingHour: "",
                            closingHour: "",
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

                        }) => (
                            <>
                                <View style={styles.container}>
                                    <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                        <CustomTextInput
                                            onChangeText={handleChange("openingHour")}
                                            value={values.openingHour}
                                            labelColor={activeColor.text}
                                            label="Opening Hour"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
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
        alignItems: "center",
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
