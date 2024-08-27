import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFormikContext } from "formik";
import AppImagePicker from "./AppImagePicker";
import InputErrorMessage from "./InputErrorMessage";
import { SIZES } from "@/constants/Sizes";

type ImageProps = {
    imageUris: string[];
    field: string;
    onAddImage: () => void;
    onRemoveImage: (uri: string) => void;
};

const MultiImagePicker = ({
    imageUris = [],
    onAddImage,
    onRemoveImage,
}: ImageProps) => {
    return (
        <View style={[styles.container]}>
            {imageUris.map((uri) => (
                <AppImagePicker
                    key={uri}
                    imageUri={uri}
                    onChangeImage={() => onRemoveImage(uri)}
                    borderRadius={20}
                />
            ))}
            {imageUris.length === 4 ? (
                ""
            ) : (
                <View style={{ width: 75, height: 75 }}>
                    <AppImagePicker
                        onChangeImage={(uri) => onAddImage(uri)}
                        borderRadius={20}
                    />
                </View>
            )}
        </View>
    );
};

export default MultiImagePicker;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        marginVertical: SIZES.marginLarge,
    },
});
