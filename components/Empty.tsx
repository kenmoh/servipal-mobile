import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';

const Empty = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: activeColor.background,
                alignItems: "center",
                justifyContent: "center",
                marginTop: Dimensions.get('screen').height * 0.3
            }}
        >
            <Text
                style={{
                    fontFamily: "Poppins-Bold",
                    fontSize: 16,
                    color: activeColor.text,
                    alignSelf: 'center'
                }}
            >
                No Order(s) yet
            </Text>
        </View>
    )
}
export default Empty
