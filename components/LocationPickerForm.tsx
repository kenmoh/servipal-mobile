import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { useFormikContext } from "formik";



import InputErrorMessage from "./InputErrorMessage";
import Select from "./Select";

type Option = {
    state: string
    capital: string
}

type LocationType = {
    field: string
    locations: Option[]
}

const LocationPickerForm = ({ field, locations, ...props }: LocationType) => {
    const { setFieldValue, touched, errors, values } = useFormikContext();

    return (
        <>
            <Select data={locations} value={values[field]} onChange={(location: string) => setFieldValue(field, location)} {...props} />
            <InputErrorMessage error={errors[field]} visible={touched[field]} />
        </>
    );
};

export default LocationPickerForm;

const styles = StyleSheet.create({});