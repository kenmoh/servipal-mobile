import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import FloatingActionButton from '../components/FloatingActionBtn';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@/auth/authContext';

type ScreenWithFABType = {
    children: React.ReactNode
    showFAB?: boolean,
    onPressFAB: () => void
}

const ScreenWithFAB = ({ children, showFAB = true, onPressFAB }: ScreenWithFABType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()
    return (
        <View style={[styles.container, { backgroundColor: activeColor.background }]}>
            {children}
            <View style={{
                position: "absolute",
                bottom: 10,
                right: 10,
            }}>
                {user?.user_type === 'vendor' && showFAB && <FloatingActionButton
                    icon={<AntDesign name="pluscircleo" color={"#fff"} size={25} />}
                    onPress={onPressFAB}
                />}
            </View>
        </View>
    )
}

export default ScreenWithFAB

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})