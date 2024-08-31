import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";


import { Formik } from "formik";

import AccountLinkText from "@/components/AcountLink";
import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";


import usersApi from "@/api/users";
import { CreateUser } from "@/utils/types";
import { router } from "expo-router";
import { vendorValidationSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@tanstack/react-query";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { SIZES } from "@/constants/Sizes";

const SenderSignup = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { error, isSuccess, mutate, isPending } = useMutation({
    mutationFn: (user: CreateUser) => usersApi.createUser(user),
  });

  if (error) {
    showMessage({
      message: error.message,
      type: "danger",
      style: {
        alignItems: "center",
      },
    });
    router.replace('signup');
  }

  if (isSuccess) {
    showMessage({
      message: "Registration Successful.",
      type: "success",
      style: {
        alignItems: "center",
      },
    });
    router.replace("confirmAccount");
  }

  return (
    < >
      <View
        style={{
          backgroundColor: activeColor.background,
          flex: 1,
          alignItems: "center",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: activeColor.background,
          }}
        >
          <Formik
            initialValues={{
              username: "",
              email: "",
              phoneNumber: "",
              confirmPassword: "",
              password: "",
            }}
            validationSchema={vendorValidationSchema}
            onSubmit={mutate}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <CustomActivityIndicator visible={isPending} />
                <View style={{ padding: SIZES.paddingMedium }}>
                  <CustomTextInput
                    label="Email"

                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    labelColor={activeColor.text}
                    inputBackgroundColor={activeColor.inputBackground}
                    inputTextColor={activeColor.text}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <InputErrorMessage error={errors.email} />
                  )}
                  <CustomTextInput
                    label="Phone Number"
                    hasBorder={theme.mode !== "dark"}
                    keyboardType="phone-pad"
                    onChangeText={handleChange("phoneNumber")}
                    value={values.phoneNumber}
                    labelColor={activeColor.text}
                    inputBackgroundColor={activeColor.inputBackground}
                    inputTextColor={activeColor.text}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <InputErrorMessage error={errors.phoneNumber} />
                  )}
                  <CustomTextInput
                    label="Username"
                    hasBorder={theme.mode !== "dark"}
                    onChangeText={handleChange("username")}
                    value={values.username}
                    labelColor={activeColor.text}
                    inputBackgroundColor={activeColor.inputBackground}
                    inputTextColor={activeColor.text}
                  />
                  {touched.username && errors.username && (
                    <InputErrorMessage error={errors.username} />
                  )}
                  <CustomTextInput
                    label="Password"
                    hasBorder={theme.mode !== "dark"}
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    value={values.password}
                    labelColor={activeColor.text}
                    inputBackgroundColor={activeColor.inputBackground}
                    inputTextColor={activeColor.text}
                  />
                  {touched.password && errors.password && (
                    <InputErrorMessage error={errors.password} />
                  )}
                  <CustomTextInput
                    label="Confirm Passord"
                    hasBorder={theme.mode !== "dark"}
                    secureTextEntry={true}
                    onChangeText={handleChange("confirmPassword")}
                    value={values.confirmPassword}
                    labelColor={activeColor.text}
                    inputBackgroundColor={activeColor.inputBackground}
                    inputTextColor={activeColor.text}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <InputErrorMessage error={errors.confirmPassword} />
                  )}
                  <View style={{ marginVertical: 25 }}>
                    <CustomBtn
                      btnColor={Colors.btnPrimaryColor}
                      label="Sign Up"

                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
          <AccountLinkText
            question="Have an account? "
            isLoginSreen={false}
            senderLink="signin"
            senderLabel="Sign In"
          />
        </ScrollView>
      </View>
      <StatusBar style={theme.mode === 'dark' ? "light" : 'dark'} backgroundColor={activeColor.background} />

    </>
  );
};

export default SenderSignup;

const styles = StyleSheet.create({});
