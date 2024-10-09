import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import FlashMessage from "react-native-flash-message";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from 'expo-system-ui'
import * as Network from 'expo-network';

import { ThemeContext, ThemeModeType } from "@/context/themeContext";
import { getTheme, storeTheme } from "@/auth/storage";
import AuthProvider from "@/components/AuthProvider";
import CartProvider from "@/components/CartProvider";
import { Colors } from "@/constants/Colors";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: "/(tabs)",
};

type ThemeMode = {
  mode: "dark" | "light";
};

export default function RootLayout() {
  const [theme, setTheme] = useState<ThemeMode>({ mode: "light" });
  let activeColor = Colors[theme.mode];

  if (Platform.OS === 'android') {
    SystemUI.setBackgroundColorAsync(activeColor.background)
  }



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
    if (theme.mode === "dark") {
      NavigationBar.setBackgroundColorAsync("#18191c");
    } else if (theme.mode === "light") {
      NavigationBar.setBackgroundColorAsync("#ffffff");
    }
  }, [theme.mode]);

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


    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <AuthProvider>
          <CartProvider>
            <Stack
              screenOptions={{
                contentStyle: { backgroundColor: activeColor.background },
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="cart"
                options={{
                  title: "Cart",
                  animation: "fade_from_bottom",
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: activeColor.background,
                  },

                  headerTintColor: activeColor.text,

                  contentStyle: {
                    backgroundColor: activeColor.background,
                  },
                }}
              />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(restaurant)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(laundry)"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(p2p)" options={{ headerShown: false }} />
              <Stack.Screen name="(order)" options={{ headerShown: false }} />
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen name="sendItem" options={{ headerShown: false }} />
              <Stack.Screen name="payment" options={{
                title: "Make Payment",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: activeColor.background,
                },

                headerTintColor: activeColor.text,

                contentStyle: {
                  backgroundColor: activeColor.background,
                },
              }} />
              <Stack.Screen name="success" options={{
                title: "Payment Successful",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: activeColor.background,
                },

                headerTintColor: activeColor.text,

                contentStyle: {
                  backgroundColor: activeColor.background,
                },
              }} />
              <Stack.Screen name="failed" options={{
                title: "Payment Failed",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: activeColor.background,
                },

                headerTintColor: activeColor.text,
                contentStyle: {
                  backgroundColor: activeColor.background,
                },
              }} />
              <Stack.Screen name="setupCompanyProfile" options={{
                title: "Profile",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: activeColor.background,
                },

                headerTintColor: activeColor.text,
                contentStyle: {
                  backgroundColor: activeColor.background,
                },
              }} />
              <Stack.Screen name="reviews" options={{
                title: "Reviews",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: activeColor.background,
                },

                headerTintColor: activeColor.text,
                contentStyle: {
                  backgroundColor: activeColor.background,
                },
              }} />
              <Stack.Screen name="disputeNotification" options={{
                title: "Notifications",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: activeColor.background,
                },

                headerTintColor: activeColor.text,
                contentStyle: {
                  backgroundColor: activeColor.background,
                },
              }} />
              <Stack.Screen name="addReview" options={{
                title: "Add Review",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: activeColor.background,
                },

                headerTintColor: activeColor.text,
                contentStyle: {
                  backgroundColor: activeColor.background,
                },
              }} />

            </Stack>
          </CartProvider>
        </AuthProvider>

        <FlashMessage
          position={"bottom"}
          style={{
            zIndex: 999
          }}

        />
      </ThemeContext.Provider>
    </QueryClientProvider>


  );
}
