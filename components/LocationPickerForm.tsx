import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { useFormikContext } from "formik";



import InputErrorMessage from "./InputErrorMessage";
import Select from "./Select";

type StatleOption = {
    state: string
    capital: string
}

type LocationType = {
    field: string
    locations: StatleOption[],
    label: string
}

const LocationPickerForm = ({ field, locations, label, ...props }: LocationType) => {
    const { setFieldValue, touched, errors, values } = useFormikContext();

    return (
        <>
            <Select label={label} data={locations} value={values[field]} onChange={(location: string) => setFieldValue(field, location)} {...props} />
            <InputErrorMessage error={errors[field]} visible={touched[field]} />
        </>
    );
};

export default LocationPickerForm;

const styles = StyleSheet.create({});