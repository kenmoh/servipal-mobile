import { Colors } from '@/constants/Colors';
import { SIZES } from '@/constants/Sizes';
import { ThemeContext } from '@/context/themeContext';
import { Entypo } from '@expo/vector-icons';
import { useField, useFormikContext } from 'formik';
import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { string } from 'yup';

type RatingProp = {
    label: string
    name: string

}

const RatingInput = ({ label, name }: RatingProp) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [field, meta, helpers] = useField(name);
    const { setFieldValue, setFieldTouched } = useFormikContext();

    const increment = () => {
        const currentValue = parseInt(field.value, 10);
        if (currentValue < 5) {
            setFieldValue(name, (currentValue + 1).toString());
        }
    };

    const decrement = () => {
        const currentValue = parseInt(field.value || '1', 10);
        if (currentValue > 1) {
            setFieldValue(name, (currentValue - 1).toString());;
        }
    };

    const handleChangeText = (text: string) => {
        const numericValue = parseInt(text, 10);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 5) {
            setFieldValue(name, text);
        }
    };
    // const increment = () => {
    //     const currentValue = parseInt(field.value || '1', 10);
    //     if (currentValue < 5) {
    //         setFieldValue(name, (currentValue + 1).toString());
    //         setFieldTouched(name, true, false);
    //     }
    // };

    // const decrement = () => {
    //     const currentValue = parseInt(field.value || '1', 10);
    //     if (currentValue > 1) {
    //         setFieldValue(name, (currentValue - 1).toString());
    //         setFieldTouched(name, true, false);
    //     }
    // };

    // const handleChangeText = (text: string) => {
    //     const numericValue = parseInt(text, 10);
    //     if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 5) {
    //         setFieldValue(name, text);
    //         setFieldTouched(name, true, false);
    //     }
    // };

    return (
        <>
            <Text style={{ color: activeColor.text, fontFamily: "Poppins-Medium" }}>{label}</Text>
            <View style={[styles.container, { borderRadius: SIZES.paddingSmall, backgroundColor: activeColor.inputBackground }]}>
                <TextInput
                    style={[styles.input, { color: activeColor.text }]}
                    value={field.value}
                    onChangeText={handleChangeText}
                    keyboardType="numeric"

                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={increment} style={[styles.button,]}>
                        <Entypo name="chevron-up" size={20} color={activeColor.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={decrement} style={[styles.button]} >
                        <Entypo name="chevron-down" size={20} color={activeColor.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '35%',
        overflow: 'hidden'
    },
    input: {
        padding: 10,
        fontSize: 16,
        width: '70%',
        fontFamily: 'Poppins-Medium'

    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
    },
    button: {

    },
});

export default RatingInput;