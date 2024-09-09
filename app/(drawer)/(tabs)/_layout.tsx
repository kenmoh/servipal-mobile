import { ReactNode, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router, Tabs } from "expo-router";
import {
  Entypo,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { Colors } from "@/constants/Colors";
import AppHeader from "@/components/AppHeader";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import { registerNotification } from "@/api/notification";
import { DrawerToggleButton } from "@react-navigation/drawer";
import authStorage from '@/auth/storage'

const TAB_BAR_ICON_SIZE = 25;

const CustomTabBarIcon = ({
  children,
  focused,
  label
}: {
  children: ReactNode;
  focused: boolean;
  label: string
}) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <>
      <View
        style={{
          backgroundColor: focused
            ? Colors.btnPrimaryColor
            : activeColor.background,
          padding: 5,
          borderRadius: 80,
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {children}
      </View>
      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: focused ? activeColor.text : activeColor.icon }}>{label}</Text>
    </>
  );
};

export default function TabLayout() {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { user } = useAuth();

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
        const token = await Notifications.getExpoPushTokenAsync({
          projectId:
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId,
        });

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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: activeColor.background,
          borderTopColor: activeColor.profileCard,
          borderTopWidth: 0,
          height: 70,
          justifyContent: 'center',
          alignItems: "center",
        },

      }}
    >
      <Tabs.Screen
        name="topTab"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (<CustomTabBarIcon focused={focused} label="Home">
            <AntDesign name="home" size={TAB_BAR_ICON_SIZE} color={color} />
          </CustomTabBarIcon>),
          headerTitle: () => <AppHeader />,
          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />

      <Tabs.Screen
        name="food"
        options={{
          title: "Restaurants",
          headerTitle: () => <AppHeader />,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: activeColor.background,
          },
          tabBarIcon: ({ color, focused }) => (
            (<CustomTabBarIcon focused={focused} label="Food">
              <MaterialIcons
                name="restaurant"
                size={TAB_BAR_ICON_SIZE}
                color={color}

              />
            </CustomTabBarIcon>)

          ),
          href: user?.user_type === "vendor" ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="laundry"
        options={{
          title: "Laudry",
          headerTitle: () => <AppHeader />,
          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon focused={focused} label="Laundry">

              <MaterialCommunityIcons
                name="washing-machine"
                size={TAB_BAR_ICON_SIZE}
                color={color}
              />
            </CustomTabBarIcon>
          ),
          href: user?.user_type === "vendor" ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="buySell"
        options={{
          title: "Buy/Sell",
          headerTitle: () => <AppHeader />,
          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon focused={focused} label="Buy">

              <Entypo name="shop" size={TAB_BAR_ICON_SIZE} color={color} />
            </CustomTabBarIcon>
          ),
          href: user?.user_type === "vendor" ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          href:
            user?.user_type === "dispatcher" || user?.user_type === "vendor"
              ? undefined
              : null,
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon focused={focused} label="Wallet">

              <Entypo name="wallet" size={TAB_BAR_ICON_SIZE} color={color} />
            </CustomTabBarIcon>
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          headerShown: true,
          headerTintColor: activeColor.text,
          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: activeColor.borderColor,
          },
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon focused={focused} label="Stats">

              <MaterialIcons
                name="bar-chart"
                size={TAB_BAR_ICON_SIZE}
                color={color}
              />
            </CustomTabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}
