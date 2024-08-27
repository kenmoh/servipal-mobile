import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ProfileContainer from '@/components/ProfileContainer'
import SupportCard from '@/components/SupportCard'
import { ThemeContext } from '@/context/themeContext'
import { Colors } from '@/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { A } from '@expo/html-elements'

const support = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <View style={styles.container}>
            <ProfileContainer>
                <SupportCard username='Hope' phoneNumber='+2347063692766' />
                <SupportCard username='Kenmoh' phoneNumber='+2347063692766' />
                <SupportCard username='Emmanuel' phoneNumber='+2347063692766' />
            </ProfileContainer>

            <ProfileContainer>
                <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingVertical: 5 }}>
                    <FontAwesome name="envelope" size={22} color={activeColor.icon} />
                    <A href={`mailto:kenneth.aremoh@gmail.com`}>

                        <Text
                            style={{
                                color: activeColor.text,
                                fontFamily: "Poppins-Thin",
                                fontSize: 12,
                            }}
                        >
                            Kenneth.aremoh@gmail.com
                        </Text>
                    </A>
                </TouchableOpacity>
            </ProfileContainer>
        </View>
    )
}

export default support

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15
    }
})