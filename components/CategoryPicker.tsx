import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useFormikContext } from "formik";

import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import InputErrorMessage from "./InputErrorMessage";

type CategoryType = {
    id: number;
    name: string;
};

const CategoryPicker = ({
    categories,
    field,
}: {
    field: string;
    categories: CategoryType[];
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    // const [selectedLanguage, setSelectedLanguage] = useState();
    const { setFieldValue, touched, errors, values } = useFormikContext();

    return (
        <View style={[styles.container, { backgroundColor: "red" }]}>
            <Text style={[styles.text, { color: activeColor.text }]}>Category</Text>
            <Picker
                style={{
                    color: activeColor.text,
                    backgroundColor: activeColor.inputBackground,
                }}
                selectedValue={values[field]}
                onValueChange={(itemValue) => setFieldValue(field, itemValue)}
                dropdownIconColor={activeColor.text}
            >
                {categories?.map((category) => (
                    <Picker.Item
                        key={category.id}
                        label={category.name}
                        value={category.name}
                        style={{
                            fontSize: 14,
                            backgroundColor: activeColor.inputBackground,
                            color: activeColor.text,
                        }}
                        fontFamily="Poppins-Light"
                    />
                ))}
            </Picker>
            <InputErrorMessage error={errors[field]} visible={touched[field]} />
        </View>
    );
};

export default CategoryPicker;

const styles = StyleSheet.create({
    container: {
        // borderRadius: 50,
        height: 45,
        justifyContent: "center",
        marginVertical: 35,
        // overflow: 'hidden'
    },
    text: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
    },
});
