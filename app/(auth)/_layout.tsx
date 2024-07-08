import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { Stack } from "expo-router";
import { useContext } from "react";

const AuthLayout = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_bottom",
        headerShown: false,
      }}
    >
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="authNav" />
      <Stack.Screen name="signupDispatch" />
      <Stack.Screen name="confirmAccount" />
      <Stack.Screen name="resetPassword" />
      <Stack.Screen name="resetPasswordLink" options={{
        title: 'Recover Password Link',
        headerShown: true,
        headerShadowVisible: false,
        headerTintColor: activeColor.text,
        headerStyle: {
          backgroundColor: activeColor.background,

        }
      }} />

    </Stack>
  );
};

export default AuthLayout;
