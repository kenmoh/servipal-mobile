import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import ProfileCard from "@/components/ProfileCard";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";
import LinkCard from "@/components/LinkCard";
import ProfileContainer from "@/components/ProfileContainer";
import HDivider from "@/components/HDivider";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/auth/authContext";

const imageUrl =
  "https://mohdelivery.s3.amazonaws.com/e715413b1c9fc13e72bf8472e4d4f183-c2e9-4404-9b4e-7453bbc79bac.jpeg";

const index = () => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(theme.mode === "dark");
  let activeColor = Colors[theme.mode];

  const toggleSwitch = () => {
    toggleTheme({ newTheme: { mode: theme.mode } }),
      setIsEnabled((previousState) => !previousState);
  };
  return (
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
            email="kenneth.aremoh@gmail.com"
            name="John Doe"
            onPress={() => { }}
          />
          <ProfileContainer>

            {user?.user_type === 'dispatch' && (<>
              <LinkCard
                onPress={() => router.push('/profile/addRider')}
                icon={<Feather name="user-plus" color={activeColor.icon} size={15} />}
                label="Add Rider"
              />

              <HDivider />
              <LinkCard
                onPress={() => router.push('/profile/addRider')}
                icon={<Feather name="users" color={activeColor.icon} size={15} />}
                label="Riders"
              />
              <HDivider />
            </>
            )}

            <LinkCard
              onPress={() => router.push('/profile/changePassword')}
              icon={<Feather name="lock" color={activeColor.icon} size={15} />}
              label="Change Password"
            />
            <HDivider />
            {
              user?.account_status === 'pending' && (
                <LinkCard
                  onPress={() => router.push('/profile/confirmAccount')}
                  icon={<Feather name="check-circle" color={activeColor.icon} size={15} />}
                  label="Confirm Account"
                />
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
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
