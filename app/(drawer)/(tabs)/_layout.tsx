import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { router, Tabs } from "expo-router";
import { Entypo, AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from 'expo-constants';

import { Colors } from "@/constants/Colors";
import AppHeader from "@/components/AppHeader";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import { registerNotification } from "@/api/notification";
import { DrawerToggleButton } from "@react-navigation/drawer";




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

        if (!user?.notification_token) {
          registerNotification(token.data);
        }
      } catch (error) {
        throw new Error(`Error getting notification token. \n ERROR: ${error}`);
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
        headerLeft: () => <DrawerToggleButton tintColor={activeColor.icon} />,
        tabBarActiveTintColor: activeColor.text,
        headerTitleAlign: "center",
        headerTintColor: activeColor.text,
        tabBarStyle: {
          borderTopWidth: StyleSheet.hairlineWidth,
          backgroundColor: activeColor.background,
          height: 70,
          borderTopColor: activeColor.profileCard,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,

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

          }
        }}

      />


      <Tabs.Screen
        name="food"
        options={{
          title: 'Food',
          headerTitle: () => <AppHeader />,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: activeColor.background,

          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="restaurant" size={size} color={color} />
          ),
          href: (user?.user_type === 'vendor' ? undefined : null)
        }}
      />

      <Tabs.Screen
        name="laundry"
        options={{
          title: 'Laudry',
          headerTitle: () => <AppHeader />,
          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,

          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="washing-machine" size={size} color={color} />
          ),
          href: (user?.user_type === 'vendor' ? undefined : null)
        }}
      />

      <Tabs.Screen
        name="buySell"
        options={{
          title: 'Buy/Sell',
          headerTitle: () => <AppHeader />,
          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,

          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="sell" size={size} color={color} />
          ),
          href: (user?.user_type === 'vendor' ? undefined : null)


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
        name="stats"
        options={{
          title: 'Stats',
          headerShown: true,
          headerTintColor: activeColor.text,
          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: activeColor.borderColor
          },
          tabBarIcon: ({ color, size }) =>
            <MaterialIcons name="bar-chart" size={size} color={color} />
        }}



      />



    </Tabs>
  );
}
