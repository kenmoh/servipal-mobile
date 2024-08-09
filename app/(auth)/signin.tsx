import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

import AccountLinkText from "@/components/AcountLink";
import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";
import TitleText from "@/components/TitleText";
import usersApi from "@/api/users";
import authApi from "@/api/auth";
import { Login, UserReturn } from "@/utils/types";
import { showMessage } from "react-native-flash-message";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { loginValidationSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import authStorage from '@/auth/storage'


const SignIn = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const authContext = useAuth();

  const { error, isSuccess, mutate, isPending, data } = useMutation({
    mutationFn: ({ username, password }: Login) => authApi.loginApi(username, password),
  });


  useEffect(() => {
    if (error) {
      showMessage({
        message: error.message,
        type: "danger",
        style: {
          alignItems: "center",
        },
      });
      router.replace("signin");

    }
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      const user = jwtDecode(data?.access_token) as UserReturn;

      if (user?.account_status === 'confirmed') {
        authContext.setUser(user);
        authStorage.storeToken(data.access_token);
      }
      if (user?.account_status === 'pending') {
        showMessage({
          message: "Please verify your email and phone number.",
          type: "danger",
          style: {
            alignItems: "center",
          },
        });
        router.replace("confirmAccount");
        return;
      }
      showMessage({
        message: "Login Successful.",
        type: "success",
        style: {
          alignItems: "center",
        },
      });
      router.replace("(tabs)/topTab");
      return;
    }
  }, [isSuccess, data])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: activeColor.background,
          flex: 1,
          alignItems: "center",
        }}
      >
        <CustomActivityIndicator visible={isPending} />
        <View
          style={{
            flex: 1,
            width: "100%",
            borderRadius: 10,
            padding: 20,
            backgroundColor: activeColor.background,
          }}
        >
          <TitleText label="Sign In" textColor={activeColor.text} />
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={mutate}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <View>
                  <CustomTextInput
                    label="Email"

                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={handleChange("username")}
                    value={values.username}
                    labelColor={activeColor.text}
                    inputHeight={50}
                    borderRadius={5}

                  />
                  {touched.username && errors.username && (
                    <InputErrorMessage error={errors.username} />
                  )}
                  <CustomTextInput
                    label="Password"
                    // hasBorder={theme.mode !== "dark"}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    value={values.password}
                    labelColor={activeColor.text}
                    inputHeight={50}
                    borderRadius={5}
                  // inputBackgroundColor={activeColor.inputBackground}
                  // inputTextColor={activeColor.text}
                  />
                  {touched.password && errors.password && (
                    <InputErrorMessage error={errors.password} />
                  )}
                  <Link href={'resetPasswordLink'} style={{ alignSelf: 'flex-end', color: activeColor.icon }}>
                    Forgot Password?
                  </Link>
                  <View style={{ marginVertical: 25 }}>
                    <CustomBtn
                      btnColor={Colors.btnPrimaryColor}
                      label="Login"
                      btnBorderRadius={5}
                      btnHeight={50}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
          <AccountLinkText
            isLoginSreen={true}
            question="Sign up as a "
            senderLabel="Sender"
            senderLink="/signup"
            riderLink="signupDispatch"
            riderLabel="Rider"
          />
        </View>

      </View>
      <StatusBar style="light" backgroundColor={activeColor.background} />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});


