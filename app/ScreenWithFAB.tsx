import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import FloatingActionButton from '../components/FloatingActionBtn';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@/auth/authContext';
import { UserReturn } from '@/utils/types';

type ScreenWithFABType = {
    children: React.ReactNode
    showFAB?: boolean,
    onPressFAB: () => void,
    fabCondition?: (vendor: UserReturn) => boolean
}

const ScreenWithFAB = ({ children, showFAB = true, onPressFAB, fabCondition }: ScreenWithFABType) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth()

    // Define default condition
    const defaultCondition = (vendor: UserReturn) =>
        vendor?.user_type === 'Laundry Service Provider' ||
        vendor?.user_type === 'Restaurant Service Provider' ||
        vendor?.user_type === 'Regular User';
    // Use custom condition if provided, otherwise use default
    const shouldShowFAB = fabCondition ? fabCondition(user!) : defaultCondition(user!);
    return (
        <View style={[styles.container, { backgroundColor: activeColor.background }]}>
            {children}
            <View style={{
                position: "absolute",
                bottom: 10,
                right: 10,
            }}>
                {/* {(user?.user_type === 'Laundry Service Provider' || user?.user_type === 'Restaurant Service Provider' || user?.user_type === 'Regular User') && showFAB && <FloatingActionButton
                    icon={<AntDesign name="pluscircleo" color={"#fff"} size={25} />}
                    onPress={onPressFAB}
                />} */}


                {shouldShowFAB && showFAB && <FloatingActionButton
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