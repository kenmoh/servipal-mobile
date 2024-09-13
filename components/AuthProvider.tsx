import React, { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext, useProtectedRoute } from "@/auth/authContext";
import authStorage from '@/auth/storage'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{} | null>(null);
  const [openingHour, setOpeningHour] = useState<{} | null>(null);
  const signIn = () => {
    // Implement signIn logic
  };

  const restoreToken = async () => {
    const token = await authStorage.getToken()
    if (!token) return
    setUser(jwtDecode(token))
  }

  useEffect(() => {
    restoreToken()
  }, [])


  const signOut = () => {
    setUser(null);
    authStorage.removeToken()
  };
  useProtectedRoute(user);
  return (
    <AuthContext.Provider value={{ signIn, signOut, setUser, user, openingHour, setOpeningHour }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
