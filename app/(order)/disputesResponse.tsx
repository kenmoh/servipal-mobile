import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ThemeContext } from '@/context/themeContext'
import { Colors } from '@/constants/Colors'
import ProfileContainer from '@/components/ProfileContainer'
import { SIZES } from '@/constants/Sizes'
import { DisputeRespose } from '@/utils/types'


const disputesResponse = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { username, subject, content, responses, createdAt } = useLocalSearchParams()
    const data: DisputeRespose[] = responses
    console.log(data)
    return (
        <View style={{ flex: 1, backgroundColor: activeColor.background, paddingHorizontal: SIZES.paddingMedium }}>

            <ProfileContainer >
                <View style={{ marginVertical: SIZES.marginSmall }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <Text style={[styles.text, { color: activeColor.text, textTransform: 'capitalize' }]}>{username}</Text>
                        <Text style={[{ fontFamily: 'Poppins-Light', fontSize: 11, color: activeColor.icon }]}>{`${createdAt}`.split('T')[0]}</Text>
                    </View>
                    <Text style={[{ fontFamily: 'Poppins-Light', fontSize: 11, color: activeColor.text }]}>{subject}</Text>
                    <Text style={[{ fontFamily: 'Poppins-Light', fontSize: 11, color: activeColor.text }]}>{content}</Text>
                </View>
            </ProfileContainer>

            <FlatList
                data={data}
                keyExtractor={(item, index) => `${item?.id.toString()}-${index}`}
                renderItem={({ item }) => <ResponseCard item={item} />}
            />
        </View>
    )
}

export default disputesResponse

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13
    }
})


const ResponseCard = ({ item }: { item: DisputeRespose }) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];


    return (
        <View

        >

            <View
                style={{
                    marginBottom: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        color: activeColor.text,
                        fontSize: 14,
                        fontFamily: "Poppins-Medium",
                        textTransform: 'capitalize'
                    }}
                >
                    {item.username}
                </Text>
                <Text
                    style={{
                        color: activeColor.icon,
                        fontSize: 12,
                        fontFamily: "Poppins-Light",
                    }}
                >
                    {item.created_at.split("T")[0]}
                </Text>
            </View>
            <Text
                style={{
                    color: activeColor.text,
                    fontSize: 12,
                    fontFamily: "Poppins-Regular",
                }}
            >
                {item.content}
            </Text>

        </View>
    );
};

