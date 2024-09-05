import { useContext } from "react";
import { StyleSheet } from "react-native";
import { router, withLayoutContext } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ScreenWithFAB from "@/app/ScreenWithFAB";

const ItemTopTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const ItemTabLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const handlePress = () => router.push("sendItem")
    return (
        <ScreenWithFAB onPressFAB={handlePress}>
            <ItemTopTabBar
                screenOptions={{
                    tabBarLabelStyle: {
                        color: activeColor.tabIconDefault,
                        fontSize: 12,
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        fontFamily: 'Poppins-Bold',

                    },
                    tabBarAndroidRipple: { borderless: false },
                    tabBarPressColor: "gray",
                    tabBarStyle: {
                        borderBottomColor: activeColor.borderColor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: activeColor.background,
                    },

                }}
            >
                <ItemTopTabBar.Screen name="index" options={{ title: "Buy" }} />
                <ItemTopTabBar.Screen name="items" options={{ title: "Items" }} />
                <ItemTopTabBar.Screen name="orders" options={{ title: "New Order(s)" }} />

            </ItemTopTabBar>
        </ScreenWithFAB>
    );
};

export default ItemTabLayout;

const styles = StyleSheet.create({});
