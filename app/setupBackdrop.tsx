import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";

import { backdropValidationSchema } from "@/utils/validations";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import { Colors } from "@/constants/Colors";
import ImagePickerForm from "@/components/ImageFormPicker";
import CustomBtn from "@/components/CustomBtn";
import userApi from "@/api/users";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";

type ImageType = {
    logo: string;
    backDrop: string;
};

const setupBackdrop = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();

    const { mutate, isPending } = useMutation({
        mutationFn: (image: ImageType) => userApi.companyProfileImage(image),
        onError: (error) => console.log(error.message),
    });

    return (
        <>
            <CustomActivityIndicator visible={isPending} />
            <View
                style={[styles.container, { backgroundColor: activeColor.background }]}
            >
                <Formik
                    initialValues={{
                        backDrop: "",
                        logo: "",
                    }}
                    onSubmit={mutate}
                    validationSchema={backdropValidationSchema}
                >
                    {({ handleSubmit }) => (
                        <>
                            <>
                                <Text style={[styles.text, { color: activeColor.text }]}>
                                    Logo Image
                                </Text>
                                <ImagePickerForm field={"logo"} height={200} width={300} />
                            </>
                            <>
                                <Text style={[styles.text, { color: activeColor.text }]}>
                                    Backdrop Image
                                </Text>
                                <ImagePickerForm field={"backDrop"} height={200} width={300} />
                            </>
                            <CustomBtn
                                label="submit"
                                btnColor="orange"
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>
            </View>
        </>
    );
};

export default setupBackdrop;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 30,
    },
    btnContainer: {
        marginVertical: 20,
    },
    text: {
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        alignSelf: "flex-start",
    },
});
