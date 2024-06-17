import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ProfileContainer from '@/components/ProfileContainer'
import { router, useLocalSearchParams } from 'expo-router';
import { showMessage } from 'react-native-flash-message';
import { ThemeContext } from '@/context/themeContext';
import { Colors } from '@/constants/Colors';
import TransferCard from '@/components/TransferCard';
import HDivider from '@/components/HDivider';




const transferDetail = () => {
    const params = useLocalSearchParams();
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { transfer_reference, account_number, bank_name, amount, mode } =
        params;


    const trasactionArray = [
        {
            title: 'Total Amount',
            detail: amount
        },
        {
            title: 'Bank Account Number',
            detail: account_number
        },
        {
            title: 'Bank Name',
            detail: bank_name
        },
        {
            title: 'Reference',
            detail: transfer_reference
        },
        {
            title: 'Mode',
            detail: mode
        },
    ]

    const handleGoBack = () => {
        router.push("topTab/myOrder");
        showMessage({
            message: "Your order will be listed for pickup as soon as your payment is confirmed!",
            type: "info",
        });
    };
    return (
        <View style={{ flex: 1, backgroundColor: activeColor.background, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
            <Text
                style={{
                    fontSize: 14,
                    color: activeColor.text,
                    alignSelf: "stretch",
                    marginBottom: 15,
                    fontFamily: 'Poppins-SemiBold'
                }}
            >
                Please transfer{" "}
                <Text
                    style={{ fontSize: 15, color: activeColor.text, fontFamily: "Poppins-Bold" }}
                >
                    ₦ {amount}
                </Text>{" "}
                into the account details below
            </Text>
            <ProfileContainer>
                {
                    trasactionArray.map((transaction, index) => (
                        <React.Fragment key={transaction.title}>
                            <TransferCard
                                title={transaction.title}
                                details={transaction?.detail}

                            />
                            {(index < trasactionArray.length - 1) && <HDivider />}

                        </React.Fragment>
                    ))
                }
            </ProfileContainer>

            <TouchableOpacity style={styles.back} onPress={handleGoBack}>
                <Text style={{ color: activeColor.text }}>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default transferDetail

const styles = StyleSheet.create({
    back: {
        backgroundColor: Colors.primaryBtnColor,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginTop: 20,
    },
})