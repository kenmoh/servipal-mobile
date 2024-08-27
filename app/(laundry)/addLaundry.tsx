import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { showMessage } from 'react-native-flash-message';
import { useMutation, useQuery } from '@tanstack/react-query';
import CustomTextInput from '@/components/CustomTextInput';
import InputErrorMessage from '@/components/InputErrorMessage';
import CustomBtn from '@/components/CustomBtn';
import ImagePickerForm from '@/components/ImageFormPicker';
import { Formik } from 'formik';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { addLaundryValidation } from '@/utils/orderValidation';
import { CreateLaundry } from '@/utils/types';
import { addLaundry } from '@/api/laundry';

const AddLaundry = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { error, isSuccess, mutate, isPending, data } = useMutation({
        mutationFn: (laundry: CreateLaundry) => addLaundry(laundry),
    });




    useEffect(() => {

        if (error) {
            showMessage({
                message: error.message || 'Something went wrong!',
                type: "danger",
                style: {
                    alignItems: "center",
                },
            });
            router.push("sendItem");
        }
        if (isSuccess) {
            showMessage({
                message: "Item successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push('sendItem');
        }
    }, [error, isSuccess])
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
                            name: "",
                            price: "",
                            image: "",
                        }}
                        onSubmit={(values, { resetForm }) => mutate(values, { onSuccess: () => resetForm() })}
                        validationSchema={addLaundryValidation}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
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

                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={{ flex: 1, paddingHorizontal: 5 }}>
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
        </View >
    )
}

export default AddLaundry

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
})