import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import FloatingActionButton from "./FloatingActionBtn";
import { UserReturn, Transactions } from "@/utils/types";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SIZES } from "@/constants/Sizes";



const WalletCard = ({ wallet, user, onPress }: { wallet: Transactions, user: UserReturn, onPress: () => void }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (

        <LinearGradient colors={['#2566af', '#234c80', '#1d3454', '#151d2c']} style={styles.container}>
            <Text
                style={{
                    color: 'white',
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 16,
                }}
            >
                Balance
            </Text>
            <Text
                style={{
                    color: 'white',
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 28,
                }}
            >
                ₦ {wallet?.balance || 0.00}
            </Text>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                {
                    user.user_type !== 'Dispatch Provider' && <FloatingActionButton
                        icon={
                            <Feather name="plus" size={24} color={activeColor.text} />
                        }
                        label="Deposit"
                        width={100}
                        height={35}
                        color={activeColor.text}
                        backgroundColor={activeColor.borderColor}
                        onPress={() => router.push('/wallet/fundWallet')}
                    />
                }
                <FloatingActionButton
                    icon={
                        <Feather name="arrow-up-right" size={24} color={activeColor.text} />
                    }
                    label="Withdraw"
                    width={110}
                    height={35}
                    color={activeColor.text}
                    backgroundColor={activeColor.borderColor}
                    onPress={onPress}

                />
            </View>
        </LinearGradient>

    );
};

export default WalletCard;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height * 0.30,
        paddingVertical: 75,
        paddingHorizontal: SIZES.paddingLarge,

    },
    gradient: {
        height: '100%'
    }
});
