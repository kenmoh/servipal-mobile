import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

type CustomGrowingInputProps = {
    value: string;
    onChange: (text: string) => void;
    placeholder: string;
};

const CustomGrowingInput = ({ value, onChange, placeholder }: CustomGrowingInputProps) => {
    const [height, setHeight] = useState<number>(40);

    const handleContentSizeChange = (contentSize: { height: number }) => {
        setHeight(contentSize.height);
    };

    return (
        <View style={[styles.container, { height: Math.max(40, height) }]}>
            <TextInput
                style={[styles.input, { color: '#ccc', fontFamily: 'Poppins-Light', fontSize: 14 }]}
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                multiline
                onContentSizeChange={(e) => handleContentSizeChange(e.nativeEvent.contentSize)}
                textAlignVertical="top"
                placeholderTextColor={'#bbb'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.btnPrimaryColor,
        borderRadius: 10,
        overflow: "hidden",
    },
    input: {
        padding: 10,
        fontSize: 16,
        minHeight: 40, // Minimum height
    },
});

export default CustomGrowingInput;
