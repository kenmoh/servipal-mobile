import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@tanstack/react-query";
import CustomTextInput from "@/components/CustomTextInput";
import InputErrorMessage from "@/components/InputErrorMessage";
import CustomBtn from "@/components/CustomBtn";
import { Formik } from "formik";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { StatusBar } from "expo-status-bar";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { addItemValidationSchema } from "@/utils/orderValidation";
import { CreateListingType, ItemType } from "@/utils/types";

import { SIZES } from "@/constants/Sizes";
import ImageListForm from "@/components/ImageListForm";
import { addListing, updateListing } from "@/api/items";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ColorInput from "@/components/ColorInput";

const INPUT_WIDTH = Dimensions.get("screen").width * 0.45;

const AddItem = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [colors, setColors] = useState<string[]>([""]);
    const [sizes, setSizes] = useState<number[]>([0]);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
        null
    );

    const { id, imageUrls, colors: itemColors, description, name, price, sizes: itemSizes, stock } = useLocalSearchParams()

    const handleRemoveColor = (index: number) => {
        const newColors = colors.filter(
            (_, i) => i !== index
        );
        setColors(newColors);
    }

    const handleChangeText = (text: string, index: number) => {
        const newColors = [...colors];
        newColors[index] = text;
        setColors(newColors);
    }

    const { mutate, isPending } =
        useMutation<CreateListingType>({
            mutationFn: (listing: CreateListingType) => addListing(listing),
            onError: (error) => {
                showMessage({
                    message: error.message || "Something went wrong!",
                    type: "danger",
                    style: {
                        alignItems: "center",
                    },
                });
                router.push("(p2p)/addItem");
            },
            onSuccess: () => {
                showMessage({
                    message: "Item updated successfully.",
                    type: "success",
                    style: {
                        alignItems: "center",
                    },
                });
                router.push("(p2p)/addItem");
            }

        });
    const { mutate: update, isPending: pending } =
        useMutation<CreateListingType>({
            mutationFn: (listing: CreateListingType) => updateListing(id, listing),
            onError: (error: Error) => {
                showMessage({
                    message: error.message || "Something went wrong!",
                    type: "danger",
                    style: {
                        alignItems: "center",
                    },
                });
                router.push("(p2p)/addItem");
            },
            onSuccess: () => {
                showMessage({
                    message: "Item updated successfully.",
                    type: "success",
                    style: {
                        alignItems: "center",
                    },
                });
                router.push("(tabs)/buySell/product");
            }

        });


    return (
        <>
            <CustomActivityIndicator visible={isPending || pending} />
            <Stack.Screen options={{ title: id ? 'Update Item' : 'Add Item' }} />
            <View
                style={{
                    backgroundColor: activeColor.background,
                    flex: 1,
                    paddingHorizontal: SIZES.paddingSmall,
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <StatusBar style="inverted" />

                    <Formik
                        initialValues={{
                            name: name || "",
                            price: price || "",
                            images: imageUrls ? JSON.parse(imageUrls) : [],
                            colors: itemColors || [],
                            sizes: itemSizes || [],
                            stock: stock || "",
                            description: description || "",
                        }}
                        // onSubmit={(values, { resetForm }) =>
                        //     mutate(values, { onSuccess: () => resetForm() })
                        onSubmit={(values, { resetForm }) => {

                            if (id) {
                                update(values, { onSuccess: () => resetForm() }); // Update if id exists
                            } else {
                                mutate(values, { onSuccess: () => resetForm() }); // Create if no id
                            }
                        }
                        }
                        validationSchema={addItemValidationSchema}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
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
                                <View style={{ flexDirection: "row", gap: 10 }}>
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
                                {/* <View>
                                    <View>
                                        {sizes.map((size, index) => (
                                            <View
                                                key={index}
                                                style={{ flexDirection: "row", alignItems: "center" }}
                                            >
                                                <CustomTextInput
                                                    onChangeText={(text) => {
                                                        const newSizes = [...sizes];
                                                        newSizes[index] = Number(text);
                                                        setSizes(newSizes);
                                                    }}
                                                    value={size.toString()}
                                                    labelColor={activeColor.text}
                                                    label={`Size ${index + 1}`}
                                                    inputBackgroundColor={activeColor.inputBackground}
                                                    inputTextColor={activeColor.text}
                                                    keyboardType="numeric"
                                                />
                                                <CustomBtn
                                                    btnColor="red"
                                                    label="Remove"
                                                    onPress={() => {
                                                        const newSizes = sizes.filter(
                                                            (_, i) => i !== index
                                                        );
                                                        setSizes(newSizes);
                                                    }}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                </View> */}

                                {/* <View style={{}}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                                        {colors.map((color, index) => (
                                            <View key={index} style={{ width: 100, flexDirection: 'row' }}>

                                                <ColorInput inputBackgroundColor={'purple'} onPress={() => handleRemoveColor(index)} />
                                            </View>
                                        ))}
                                    </View>
                                    <TouchableOpacity
                                        hitSlop={10}
                                        activeOpacity={.6}
                                        onPress={() => setColors([...colors, ""])}
                                    >
                                        <MaterialIcons name="add" size={25}
                                            color={activeColor.icon}
                                        />
                                    </TouchableOpacity>
                                </View> */}
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

                                <ImageListForm field="images" />

                                <View style={{ marginVertical: 30 }}>
                                    <CustomBtn
                                        label={id ? "update" : "submit"}
                                        btnColor="orange"
                                        onPress={handleSubmit}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </View >
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
