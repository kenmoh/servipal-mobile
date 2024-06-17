import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import ProfileCard from "@/components/ProfileCard";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { Feather } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import LinkCard from "@/components/LinkCard";
import ProfileContainer from "@/components/ProfileContainer";
import HDivider from "@/components/HDivider";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/auth/authContext";

const imageUrl =
  "https://mohdelivery.s3.amazonaws.com/e715413b1c9fc13e72bf8472e4d4f183-c2e9-4404-9b4e-7453bbc79bac.jpeg";




const index = () => {
  const { user, setUser } = useAuth()
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(theme.mode === "dark");
  let activeColor = Colors[theme.mode];

  const linkArray = [

    {
      screen: () => router.push('/profile/changePassword'),
      label: 'Change Password',
      icon: <Feather name="lock" color={activeColor.icon} size={15} />
    },



  ]

  const toggleSwitch = () => {
    toggleTheme({ newTheme: { mode: theme.mode } }),
      setIsEnabled((previousState) => !previousState);
  };
  return (
    <>
      <SafeAreaView style={[
        styles.container,
        { backgroundColor: activeColor.background },
      ]}>
        <ScrollView
          style={[
            styles.container,
            { backgroundColor: activeColor.background },
          ]}
        >
          <View
            style={[
              {
                flex: 1,
                paddingHorizontal: 10,
                alignItems: "center",
                justifyContent: 'center'
              },
            ]}
          >
            <ProfileCard
              image={imageUrl}
              email={user?.email}
              name={user?.company_name || user?.username}
              onPress={() => { }}
            />
            <ProfileContainer>

              {user?.user_type === 'dispatcher' && (<>
                <LinkCard
                  onPress={() => router.push('/profile/addRider')}
                  icon={<Feather name="user-plus" color={activeColor.icon} size={15} />}
                  label="Add Rider"
                  icon2="chevron-right"
                />

                <HDivider />
                <LinkCard
                  onPress={() => router.push('/profile/riders')}
                  icon={<Feather name="users" color={activeColor.icon} size={15} />}
                  label="Riders"
                  icon2="chevron-right"
                />
                <HDivider />
              </>
              )}

              {
                linkArray.map((link, index) => (
                  <React.Fragment key={index}>
                    <LinkCard

                      onPress={link.screen}
                      icon={link.icon}
                      label={link.label}
                      icon2="chevron-right"
                    />

                    {(index < linkArray.length - 1) && <HDivider />}

                  </React.Fragment>
                ))
              }



              {
                user?.account_status === 'pending' && (
                  <>
                    <HDivider />
                    <LinkCard
                      onPress={() => router.push('confirmAccount')}
                      icon={<Feather name="check-circle" color={activeColor.icon} size={15} />}
                      label="Confirm Account"
                      icon2="chevron-right"
                    />
                  </>
                )
              }

            </ProfileContainer>
            <ProfileContainer>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: activeColor.text, fontFamily: 'Poppins-Light', fontSize: 14 }}>Dark Mode</Text>
                <Switch
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </ProfileContainer>
          </View>
        </ScrollView>
        <View style={{ bottom: 0, left: 0 }}>
          <ProfileContainer>
            <LinkCard
              onPress={() => setUser(null)}
              icon={<Feather name="log-out" color={activeColor.icon} size={15} />}
              label="Logout"
            />
          </ProfileContainer>
        </View>
      </SafeAreaView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
