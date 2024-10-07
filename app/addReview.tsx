import React, { useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import CustomBtn from "@/components/CustomBtn";
import { Colors } from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { RatingValidationSchema } from "@/utils/orderValidation";
import InputErrorMessage from "@/components/InputErrorMessage";
import { ThemeContext } from "@/context/themeContext";
import { showMessage } from "react-native-flash-message";
import { router, useLocalSearchParams } from "expo-router";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { SIZES } from "@/constants/Sizes";
import RatingInput from "@/components/RatingInput";
import userApi from '@/api/users'





type RatingType = {
    rating: string;
    comment: string;
};
const addReview = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { orderId } = useLocalSearchParams()

    const { mutate, isPending, data } = useMutation({
        mutationFn: (rating: RatingType) => userApi.addReview(orderId as string, rating),
        onError: (error) => {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.back();
        },
        onSuccess: () => {
            showMessage({
                message: "Review successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.back();
        }
    });

    return (
        <View
            style={{
                backgroundColor: activeColor.background,
                flex: 1,

            }}
        >
            <CustomActivityIndicator visible={isPending} />
            <StatusBar style="inverted" />
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Formik
                        initialValues={{
                            rating: '1',
                            comment: "",

                        }}
                        onSubmit={(values, { resetForm }) =>
                            mutate(values, { onSuccess: () => resetForm() })
                        }
                        validationSchema={RatingValidationSchema}
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

                                        <RatingInput label="Rating" name="rating" />
                                        {touched.rating && errors.rating && (
                                            <InputErrorMessage error={errors.rating} />
                                        )}


                                        <CustomTextInput
                                            label="Comment"
                                            onChangeText={handleChange("comment")}
                                            value={values.comment}
                                            multiline
                                            numberOfLines={8}
                                            textAlignVertical="top"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                            labelColor={activeColor.text}
                                            borderRadius={SIZES.paddingSmall}
                                            inputHeight={75}
                                        />
                                        {touched.comment && errors.comment && (
                                            <InputErrorMessage error={errors.comment} />
                                        )}

                                        <View style={styles.btnContainer}>
                                            <CustomBtn
                                                label="submit"
                                                btnColor="orange"
                                                onPress={handleSubmit}
                                                btnBorderRadius={SIZES.paddingSmall}
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

export default addReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        padding: SIZES.paddingSmall,
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
