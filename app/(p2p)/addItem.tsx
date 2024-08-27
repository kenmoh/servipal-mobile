import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@tanstack/react-query";
import CustomTextInput from "@/components/CustomTextInput";
import InputErrorMessage from "@/components/InputErrorMessage";
import CustomBtn from "@/components/CustomBtn";
import ImagePickerForm from "@/components/ImageFormPicker";
import { Formik, useFormikContext } from "formik";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { addItem } from "@/utils/orderValidation";
import { CreateListingType } from "@/utils/types";

import { SIZES } from "@/constants/Sizes";
import ImageListForm from "@/components/ImageListForm";
import { addListing } from "@/api/items";

const INPUT_WIDTH = Dimensions.get('screen').width * 0.45


const AddItem = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];



    const { error, isSuccess, mutate, isPending, data } =
        useMutation<CreateListingType>({
            mutationFn: (listing: CreateListingType) => addListing(listing),
        });

    console.log(data)

    useEffect(() => {
        if (error) {
            showMessage({
                message: error.message || "Something went wrong!",
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.push("(p2p)/addItem");
        }
        if (isSuccess) {
            showMessage({
                message: "Item successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push("(p2p)/addItem");
        }
    }, [error, isSuccess]);
    return (
        <>
            <CustomActivityIndicator visible={isPending} />
            <View style={{
                backgroundColor: activeColor.background,
                flex: 1,
                paddingHorizontal: SIZES.paddingSmall
            }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <StatusBar style="inverted" />


                    <Formik
                        initialValues={{
                            name: "",
                            price: "",
                            image: "",
                            images: [],
                            stock: "",
                            description: "",

                        }}
                        onSubmit={(values, { resetForm }) => mutate(values, { onSuccess: () => resetForm() })}
                        validationSchema={addItem}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <>
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
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <View>
                                        <CustomTextInput
                                            onChangeText={handleChange("price")}
                                            value={values.price}
                                            labelColor={activeColor.text}
                                            label="Price"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                            width={INPUT_WIDTH}
                                            keyboardType="numeric"
                                        />
                                        {touched.price && errors.price && (
                                            <InputErrorMessage error={errors.price} />
                                        )}

                                    </View>
                                    <View>
                                        <CustomTextInput
                                            onChangeText={handleChange("stock")}
                                            value={values.stock}
                                            labelColor={activeColor.text}
                                            label="Stock"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                            width={INPUT_WIDTH}
                                            keyboardType="numeric"
                                        />
                                        {touched.stock && errors.stock && (
                                            <InputErrorMessage error={errors.stock} />
                                        )}
                                    </View>
                                </View>
                                <CustomTextInput

                                    onChangeText={handleChange("description")}
                                    value={values.description}
                                    labelColor={activeColor.text}
                                    label="Description"
                                    inputBackgroundColor={activeColor.inputBackground}
                                    inputTextColor={activeColor.text}
                                    multiline


                                />
                                {touched.description && errors.description && (
                                    <InputErrorMessage error={errors.description} />
                                )}

                                <ImagePickerForm field="image" />
                                <ImageListForm field="images" />

                                <View style={{ marginVertical: 30 }}>
                                    <CustomBtn
                                        label="submit"

                                        btnColor="orange"
                                        onPress={handleSubmit}
                                    />
                                </View>



                            </>
                        )}
                    </Formik>

                </ScrollView>
            </View>
        </>
    );
};

export default AddItem;

const styles = StyleSheet.create({

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
