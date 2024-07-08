import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import FloatingActionButton from "./FloatingActionBtn";
import { UserReturn, Transactions } from "@/utils/types";
import { router } from "expo-router";



const WalletCard = ({ wallet, user }: { wallet: Transactions, user: UserReturn }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    console.log(wallet)
    return (
        <View
            style={[styles.container, { backgroundColor: activeColor.background }]}
        >
            <Text
                style={{
                    color: activeColor.text,
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 16,
                }}
            >
                Balance
            </Text>
            <Text
                style={{
                    color: activeColor.text,
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 28,
                }}
            >
                ₦ {wallet?.balance || 0.00}
            </Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
                {
                    user.user_type === 'vendor' && <FloatingActionButton
                        icon={
                            <Feather name="plus" size={24} color={activeColor.text} />
                        }
                        label="Deposit"
                        width={100}
                        height={35}
                        color={activeColor.text}
                        backgroundColor={activeColor.borderolor}
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
                    backgroundColor={activeColor.borderolor}
                    onPress={() => { }}

                />
            </View>
        </View>
    );
};

export default WalletCard;

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 35,
        padding: 35,
        // borderRadius: 10,
        marginBottom: 25
    },
});
