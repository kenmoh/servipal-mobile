import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MultiImagePicker from './multipleImageForm'
import InputErrorMessage from './InputErrorMessage'
import { useFormikContext } from 'formik'

const ImageListForm = ({ field }: { field: string }) => {
    const { errors, touched, setFieldValue, values } = useFormikContext()

    const imageUris = values[field]

    const handleAddImage = (uri: string) => {
        setFieldValue(field, [...imageUris, uri])
    }
    const handleChangeImage = (uri: string) => {
        setFieldValue(field, imageUris.filter(imageUri => imageUri != uri))

    }
    return (
        <>
            <MultiImagePicker imageUris={imageUris} onAddImage={handleAddImage} onRemoveImage={handleChangeImage} />
            <InputErrorMessage error={errors[field]} visible={touched[field]} />
        </>
    )
}

export default ImageListForm

const styles = StyleSheet.create({})