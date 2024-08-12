import { StyleSheet, ScrollView, View } from "react-native";
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
import { Picker } from '@react-native-picker/picker';


import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { addMeal, getCategories } from "@/api/foods";
import CategoryPicker from "@/components/CategoryPicker";

type CategoryType = {
    id: number
    name: string
}
const AddMeal = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { error, isSuccess, mutate, isPending, data } = useMutation<AddMealType>({
        mutationFn: (meal: AddMealType) => addMeal(meal),
    });

    const { data: categoriesData } = useQuery<CategoryType[]>({
        queryKey: ['categories'],
        queryFn: getCategories,

    })


    // useEffect(() => {
    //     if (categoriesData) {
    //         const categoryNames = categoriesData?.data.map((category: CategoryType) => category.name);
    //         setCategories(categoryNames);
    //     }
    // }, [categoriesData]);

    console.log(categoriesData?.data)

    useEffect(() => {

        if (error) {
            showMessage({
                message: error.message,
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.push("/(restaurant)/addMeal");
        }
        if (isSuccess) {
            showMessage({
                message: "Meal successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push('/(restaurant)/addMeal');
        }
    }, [error, isSuccess])
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
                            name: "",
                            price: "",
                            category: "",
                            side: "",
                            ingredients: "",
                            image: "",
                        }}
                        onSubmit={mutate}
                        validationSchema={addMealValidation}
                    >
                        {({ handleChange, handleSubmit, resetForm, values, errors, touched }) => (
                            <>
                                <View style={styles.container}>
                                    <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                        <CustomTextInput
                                            onChangeText={handleChange("name")}
                                            value={values.name}
                                            labelColor={activeColor.text}
                                            label="Name"
                                            hasBorder={theme.mode !== "dark"}
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
                                            hasBorder={theme.mode !== "dark"}
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                        />
                                        {touched.price && errors.price && (
                                            <InputErrorMessage error={errors.price} />
                                        )}
                                        {/* <Picker
                                            selectedValue={selectedLanguage}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSelectedLanguage(itemValue)
                                            }>
                                            <Picker.Item label="Java" value="java" />
                                            <Picker.Item label="JavaScript" value="js" />
                                        </Picker> */}


                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                        <CustomTextInput
                                            onChangeText={handleChange("side")}
                                            value={values.side}
                                            label="Side"
                                            hasBorder={theme.mode !== "dark"}
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
                                            hasBorder={theme.mode !== "dark"}
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
                                        <CategoryPicker categories={categoriesData?.data} field="category" />
                                        {/* <LocationPickerForm field={"category"} locations={categoriesData?.data} label="Category" /> */}
                                        <ImagePickerForm field={"image"} />

                                        <View style={styles.btnContainer}>
                                            <CustomBtn
                                                label="submit"
                                                btnBorderRadius={5}
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
        </View >
    )
}

export default AddMeal

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
})