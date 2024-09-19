import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Formik } from 'formik';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { StatusBar } from 'expo-status-bar';
import InputErrorMessage from '@/components/InputErrorMessage';
import CustomTextInput from '@/components/CustomTextInput';
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import { showMessage } from 'react-native-flash-message';
import { router } from 'expo-router';
import { CategoryValidationSchema } from '@/utils/orderValidation';
import { addMealCategory } from '@/api/foods';
import { useMutation } from '@tanstack/react-query';
import CustomBtn from '@/components/CustomBtn';


const addCategory = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const { error, isSuccess, mutate, isPending, data } = useMutation({
        mutationFn: (name: string) => addMealCategory(name),
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
            router.push("/(restaurant)/addMeal");
        }
        if (isSuccess) {
            showMessage({
                message: "Category added successfully.",
                type: "success",
                style: {
                    alignItems: "center",
                },
            });
            router.push("/(restaurant)/addMeal");
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
            <CustomActivityIndicator visible={isPending} />
            <StatusBar style="inverted" />


            <Formik
                initialValues={{
                    name: "",

                }}
                onSubmit={(values, { resetForm }) =>
                    mutate(values, { onSuccess: () => resetForm() })
                }
                validationSchema={CategoryValidationSchema}
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
                                <View style={styles.btnContainer}>
                                    <CustomBtn
                                        label="Add"
                                        btnColor="orange"
                                        onPress={handleSubmit}
                                    />
                                </View>

                            </View>
                        </View>

                    </>
                )}
            </Formik>

        </View>
    );
}

export default addCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        alignSelf: 'center'

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