import { StyleSheet, ScrollView, View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import ImagePickerForm from "@/components/ImageFormPicker";

import CustomBtn from "@/components/CustomBtn";
import { Colors } from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { addMealValidation } from "@/utils/orderValidation";
import InputErrorMessage from "@/components/InputErrorMessage";

import { ThemeContext } from "@/context/themeContext";
import { useContext, useEffect, useState } from "react";
import { AddMealType } from "@/utils/types";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { addMeal, getCategories } from "@/api/foods";
import CustomPickerTextInput from "@/components/AppModal";
import { useAuth } from "@/auth/authContext";


type CategoryType = {
    id: number;
    name: string;
};
const AddMeal = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()

    const { error, isSuccess, mutate, isPending } = useMutation({
        mutationFn: (meal: AddMealType) => addMeal(meal),
    });



    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
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

            {user?.location ? (<>
                <CustomActivityIndicator visible={isPending} />
                <StatusBar style="inverted" />
                <View style={styles.mainContainer}>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Formik
                            initialValues={{
                                name: "",
                                price: "",
                                category: "",
                                side: "",
                                ingredients: "",
                                preparationTime: "",
                                image: "",
                            }}
                            onSubmit={(values, { resetForm }) =>
                                mutate(values, { onSuccess: () => resetForm() })
                            }
                            validationSchema={addMealValidation}
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
                                                onChangeText={handleChange("name")}
                                                value={values.name}
                                                labelColor={activeColor.text}
                                                label="Name"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                            />
                                            {touched.name && errors.name && (
                                                <InputErrorMessage error={errors.name} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={handleChange("price")}
                                                value={values.price}
                                                labelColor={activeColor.text}
                                                label="Price"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                            />
                                            {touched.price && errors.price && (
                                                <InputErrorMessage error={errors.price} />
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                            <CustomTextInput
                                                onChangeText={handleChange("side")}
                                                value={values.side}
                                                label="Side"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                labelColor={activeColor.text}
                                            />
                                            {touched.side && errors.side && (
                                                <InputErrorMessage error={errors.side} />
                                            )}
                                            <CustomTextInput
                                                label="Ingredients"
                                                onChangeText={handleChange("ingredients")}
                                                value={values.ingredients}
                                                multiline
                                                numberOfLines={4}
                                                textAlignVertical="top"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                labelColor={activeColor.text}
                                            />
                                            {touched.ingredients && errors.ingredients && (
                                                <InputErrorMessage error={errors.ingredients} />
                                            )}
                                            <CustomTextInput
                                                label="Preparation Time"
                                                onChangeText={handleChange("preparationTime")}
                                                value={values.preparationTime}
                                                multiline
                                                numberOfLines={4}
                                                textAlignVertical="top"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                labelColor={activeColor.text}
                                            />
                                            {touched.preparationTime && errors.preparationTime && (
                                                <InputErrorMessage error={errors.preparationTime} />
                                            )}

                                            <CustomPickerTextInput
                                                label="Category"
                                                categories={categoriesData?.data}
                                                onSelect={(item: CategoryType) =>
                                                    setFieldValue("category", item.name)
                                                }
                                            />
                                            {touched.category && errors.category && (
                                                <InputErrorMessage error={errors.category} />
                                            )}

                                            <ImagePickerForm field={"image"} />

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
            </>) : (
                <Text
                    onPress={() => router.push("setupCompanyProfile")}
                    style={{
                        color: activeColor.icon,
                        fontFamily: "Poppins-Regular",
                        fontSize: 12,
                        textDecorationLine: 'underline',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                    Setup company profile image, opening and closing hours.
                </Text>
            )}
        </View>
    );
};

export default AddMeal;

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
