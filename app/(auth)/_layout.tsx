import { Stack } from "expo-router";

const AuthLayout = () => {
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

    </Stack>
  );
};

export default AuthLayout;
