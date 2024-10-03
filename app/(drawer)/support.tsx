import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ProfileContainer from '@/components/ProfileContainer'
import SupportCard from '@/components/SupportCard'
import { ThemeContext } from '@/context/themeContext'
import { Colors } from '@/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { A } from '@expo/html-elements'
import { SIZES } from '@/constants/Sizes'

const support = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={[styles.container, { backgroundColor: activeColor.background }]}>
            <View>
                <Text style={[styles.text, { color: activeColor.text, marginTop: SIZES.marginLarge }]}>Call us on: </Text>
                <ProfileContainer>
                    <SupportCard phoneNumber='+2347063692766' />
                    <SupportCard phoneNumber='+2347063692766' />
                    <SupportCard phoneNumber='+2347063692766' />
                </ProfileContainer>
            </View>
            <View style={{ marginVertical: SIZES.marginLarge }}>
                <Text style={[styles.text, { color: activeColor.text }]}>Chat with us on whatsapp: </Text>
                <ProfileContainer>
                    <SupportCard isWhatsapp={true} phoneNumber='+2347063692766' />
                    <SupportCard isWhatsapp={true} phoneNumber='+2347063692766' />
                    <SupportCard isWhatsapp={true} phoneNumber='+2347063692766' />
                </ProfileContainer>
            </View>

            <View>
                <Text style={[styles.text, { color: activeColor.text }]}>Email us: </Text>
                <ProfileContainer>
                    <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingVertical: 5 }}>
                        <FontAwesome name="envelope" size={22} color={activeColor.icon} />
                        <A href={`mailto:kenneth.aremoh@gmail.com`}>

                            <Text
                                style={{
                                    color: activeColor.text,
                                    fontFamily: "Poppins-Regular",
                                    fontSize: 14,
                                }}
                            >
                                servipal@servipal.com
                            </Text>
                        </A>
                    </TouchableOpacity>
                </ProfileContainer>
            </View>
        </View>
    )
}

export default support

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.paddingMedium
    },
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        textTransform: 'uppercase',


    }
})