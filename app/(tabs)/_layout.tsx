import { useContext, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Link, router, Tabs } from "expo-router";
import { Entypo, AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from 'expo-constants';

import { Colors } from "@/constants/Colors";
import AppHeader from "@/components/AppHeader";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import { registerNotification } from "@/api/notification";


const HeaderLeft = ({ link, iconName }: { link: string; iconName: any }) => {
  return (
    <Link href={link}>
      <Pressable>
        {({ pressed }) => (
          <AntDesign
            name={iconName}
            size={20}
            color={"grey"}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};

export default function TabLayout() {

  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { user } = useAuth()


  const registerForPushNotification = async () => {
    if (Device.isDevice) {
      try {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        const token = await Notifications.getExpoPushTokenAsync(
          {
            projectId: Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId,

          }
        );
        console.log(token.data)
        registerNotification(token.data);
      } catch (error) {
        console.log("Error getting notification token", error);
      }
    }
  };

  useEffect(() => {
    registerForPushNotification();
    Notifications.addNotificationResponseReceivedListener((notification) =>
      router.replace("/(tabs)")
    );
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor.text,
        headerTitleAlign: "center",
        headerTintColor: activeColor.text,
        tabBarStyle: {

          backgroundColor: activeColor.background,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10
        },
        tabBarIconStyle: {
          marginTop: 10
        }

      }}
    >
      <Tabs.Screen
        name="topTab"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          headerTitle: () => <AppHeader />,
          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: activeColor.borderolor

          }
        }}

      />


      <Tabs.Screen
        name="food"
        options={{
          title: 'Food',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="restaurant" size={size} color={color} />
          ),

        }}
      />

      <Tabs.Screen
        name="laundry"
        options={{
          title: 'Laundry',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="washing-machine" size={size} color={color} />
          ),

        }}
      />

      <Tabs.Screen
        name="buySell"
        options={{
          title: 'Buy/Sell',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="sell" size={size} color={color} />
          ),

        }}
      />


      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          href: (user?.user_type === 'dispatcher' || user?.user_type === 'vendor' ? undefined : null),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="wallet" size={size} color={color} />
          ),
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: 'red'

          },
        }}
      />

    </Tabs>
  );
}
