import { Link, Tabs } from "expo-router";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet } from "react-native";
import AppHeader from "@/components/AppHeader";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";


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

  return (
    <Tabs
      screenOptions={{

        tabBarActiveTintColor: activeColor.text,
        headerTitleAlign: "center",
        headerTintColor: activeColor.text,
        tabBarStyle: {
          borderBottomColor: activeColor.borderolor,
          borderBottomWidth: StyleSheet.hairlineWidth,
          backgroundColor: activeColor.background,
        },


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
        name="wallet"

        options={{
          title: "Wallet",

          headerStyle: {
            backgroundColor: activeColor.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: activeColor.borderolor
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="wallet" size={size} color={color} />
          ),


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
