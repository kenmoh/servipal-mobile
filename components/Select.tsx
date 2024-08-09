import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

const Select = ({
    data,
    value,
    onChange,
    borderRadius = 50,
    // hasBorder = false,
    // inputBorderWidth = hasBorder ? StyleSheet.hairlineWidth : 0,
    // inputBackgroundColor = hasBorder ? "white" : "#eee",
    // borderRadius = hasBorder ? 5 : 0,
    ...props
}) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const hasBorder = theme.mode !== "dark"

    return (
        <View>
            <Text
                style={{
                    color: activeColor.text,
                    fontSize: 14,
                    fontFamily: "Poppins-Bold",
                }}
            >
                Location
            </Text>
            <Dropdown
                style={[
                    styles.dropdown,
                    {
                        backgroundColor: activeColor.inputBackground,
                        borderRadius: borderRadius,

                    },
                ]}

                selectedTextStyle={[
                    styles.selectedTextStyle,
                    ,
                    { color: activeColor.text },
                ]}
                inputSearchStyle={[
                    styles.inputSearchStyle,
                    { color: activeColor.text, backgroundColor: activeColor.background },
                ]}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="capital"
                valueField="state"
                placeholder=""
                searchPlaceholder="Search..."
                containerStyle={{ backgroundColor: activeColor.background }}
                activeColor={activeColor.inputBackground}
                fontFamily="Poppins-Bold"
                itemTextStyle={{ color: activeColor.text, fontSize: 14 }}
                value={value}
                onChange={(item) => {
                    onChange(item.state);
                }}

                {...props}
            />
        </View>
    );
};

export default Select;

const styles = StyleSheet.create({
    dropdown: {
        width: "100%",
        alignSelf: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    icon: {
        marginRight: 5,
    },

    selectedTextStyle: {
        fontSize: 14,
        fontFamily: "Poppins-Light",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,

    },
});
