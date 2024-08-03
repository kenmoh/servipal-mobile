import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import FlashMessage from "react-native-flash-message";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeContext, ThemeModeType } from "@/context/themeContext";
import { getTheme, storeTheme } from "@/auth/storage";
import AuthProvider from "@/components/AuthProvider";
import CartProvider from "@/components/CartProvider";
import { Colors } from "@/constants/Colors";
import { StatusBar, View } from "react-native";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: '/(tabs)',
};

type ThemeMode = {
  mode: "dark" | "light";
};

export default function RootLayout() {
  const [theme, setTheme] = useState<ThemeMode>({ mode: "light" });
  let activeColor = Colors[theme.mode];

  const [loaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const toggleTheme = ({ newTheme }: { newTheme: { mode: ThemeModeType } }) => {
    let mode: ThemeModeType;
    if (newTheme) {
      mode = theme.mode === "light" ? "dark" : "light";
      newTheme = { mode };
    }
    setTheme(newTheme);
    storeTheme("appTheme", newTheme.mode);
  };

  const getStoredTheme = async () => {
    try {
      const storedTheme = await getTheme("appTheme");
      if (storedTheme) {
        toggleTheme({ newTheme: storedTheme });
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  };

  useEffect(() => {
    getStoredTheme();
  }, []);

  useEffect(() => {
    if (error) throw error;
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (

    <>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>

          <AuthProvider>
            <CartProvider>
              <Stack screenOptions={{ contentStyle: { backgroundColor: activeColor.background } }}>
                <Stack.Screen name="index" options={{ headerShown: false, }} />
                <Stack.Screen name="cart" options={{
                  animation: "fade_from_bottom",
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: activeColor.background,
                  },
                  headerTintColor: activeColor.text,
                  headerTitleAlign: 'center',
                  contentStyle: {
                    backgroundColor: activeColor.background
                  }
                }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />
                <Stack.Screen name="(restaurant)" options={{ headerShown: false, }} />
                <Stack.Screen name="(laundry)" options={{ headerShown: false, }} />
                <Stack.Screen name="(p2p)" options={{ headerShown: false, }} />
                <Stack.Screen name="(order)" options={{ headerShown: false }}
                />
              </Stack>
            </CartProvider>
          </AuthProvider>


          <FlashMessage position={"top"} style={{ marginTop: StatusBar.currentHeight }} />


        </ThemeContext.Provider>
      </QueryClientProvider>
    </>
  );
}
