import { router, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { OpeningHourReturn, UserReturn } from "@/utils/types";
type AuthContextType = {
  signIn: () => {} | void;
  signOut: () => void;
  setUser: (user: {} | null) => void;
  user?: UserReturn | null;
  openingHour?: OpeningHourReturn | null;
  setOpeningHour: (openingHour: {} | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => null,
  setUser: () => {},
  setOpeningHour: () => {},
  user: null,
  openingHour: null,
});

// This hook is used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
export function useProtectedRoute(user: {} | null) {
  const [isFirstLaunch, setIsFirstLuanch] = useState(null);
  const segments = useSegments();

  // Retrieving a value
  // const getValue = async () => {
  //   const value = await SecureStore.getItemAsync("alreadyLaunch");
  //   if (value === "" || null || undefined) {
  //     storeValue("alreadyLaunch", "true");
  //     setIsFirstLuanch(true);
  //   } else {
  //     setIsFirstLuanch(false);
  //   }
  // };

  useEffect(() => {
    // getValue();

    const inAuthGroup = segments[0] === "(auth)";

    // If isFirstLaunch, display onboarding
    if (isFirstLaunch && !user && !inAuthGroup) {
      router.replace("(auth)/welcome");
    } else if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in screen.
      router.replace("signin");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in screen.
      router.replace("/topTab");
      // setIsFirstLunch(true)
    }
  }, [user, segments, isFirstLaunch]);
}
