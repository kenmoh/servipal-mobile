import { StyleSheet, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, FormikHelpers, FormikValues } from "formik";
import ImagePickerForm from "@/components/ImageFormPicker";

import CustomBtn from "@/components/CustomBtn";
import { Colors } from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { addMealValidation, DeliverySchema } from "@/utils/orderValidation";
import InputErrorMessage from "@/components/InputErrorMessage";

import { ThemeContext } from "@/context/themeContext";
import { useContext, useEffect, useState } from "react";
import { AddMealType } from "@/utils/types";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { addMeal, getCategories } from "@/api/foods";
import LocationPickerForm from "@/components/LocationPickerForm";
import orderApi from "@/api/orders";
import { useCart } from "@/components/CartProvider";
import { CartState, OrderData } from "@/auth/cartContext";

type CategoryType = {
    name: string;
};
const DliveryInfo = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [categories, setCategories] = useState([]);

    const { setDeliveryInfo } = useCart();

    return (
        <View
            style={{
                backgroundColor: activeColor.background,
                flex: 1,
                justifyContent: "center",
            }}
        >
            <StatusBar style="auto" />
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Formik
                        initialValues={{
                            origin: "",
                            destination: "",
                            additional_info: "",
                            distance: "",
                        }}
                        onSubmit={(values) => {
                            setDeliveryInfo({
                                ...values,
                                distance: Number(values.distance),
                            });
                            router.push('/cart')
                        }}
                        validationSchema={DeliverySchema}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <>
                                <View style={styles.container}>
                                    <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                        <CustomTextInput
                                            onChangeText={handleChange("origin")}
                                            value={values.origin}
                                            labelColor={activeColor.text}
                                            label="origin"
                                            hasBorder={theme.mode !== "dark"}
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                        />
                                        {touched.origin && errors.origin && (
                                            <InputErrorMessage error={errors.origin} />
                                        )}
                                        <CustomTextInput
                                            onChangeText={handleChange("destination")}
                                            value={values.destination}
                                            labelColor={activeColor.text}
                                            label="destination"
                                            hasBorder={theme.mode !== "dark"}
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                        />
                                        {touched.destination && errors.destination && (
                                            <InputErrorMessage error={errors.destination} />
                                        )}
                                        <CustomTextInput
                                            onChangeText={handleChange("distance")}
                                            value={values.distance}
                                            labelColor={activeColor.text}
                                            label="distance"
                                            hasBorder={theme.mode !== "dark"}
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                        />
                                        {touched.distance && errors.distance && (
                                            <InputErrorMessage error={errors.distance} />
                                        )}
                                        {/* <LocationPickerForm field={"location"} locations={categories} hasBorder={theme.mode !== "dark"} /> */}
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                        <CustomTextInput
                                            label="Additional Info"
                                            onChangeText={handleChange("additional_info")}
                                            value={values.additional_info}
                                            hasBorder={theme.mode !== "dark"}
                                            multiline
                                            numberOfLines={4}
                                            textAlignVertical="top"
                                            inputBackgroundColor={activeColor.inputBackground}
                                            inputTextColor={activeColor.text}
                                            labelColor={activeColor.text}
                                        />
                                        {touched.additional_info && errors.additional_info && (
                                            <InputErrorMessage error={errors.additional_info} />
                                        )}

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
        </View>
    );
};

export default DliveryInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        // alignItems: "center",
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
