import { router, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { UserReturn } from "@/utils/types";
type AuthContextType = {
  signIn: () => {} | void;
  signOut: () => void;
  setUser: (user: {} | null) => void;
  user?: UserReturn | null;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => null,
  setUser: () => {},
  user: null,
});

// This hook is used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
export function useProtectedRoute(user: {} | null) {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const segments = useSegments();

  const checkFirstLaunch = async () => {
    const hasLaunched = await SecureStore.getItemAsync("hasLaunched");
    if (!hasLaunched) {
      setIsFirstLaunch(true);
      await SecureStore.setItemAsync("hasLaunched", "true");
    } else {
      setIsFirstLaunch(false);
    }
  };
  useEffect(() => {
    checkFirstLaunch();

    const inAuthGroup = segments[0] === "(auth)";

    // If isFirstLaunch, display onboarding
    if (isFirstLaunch) {
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
