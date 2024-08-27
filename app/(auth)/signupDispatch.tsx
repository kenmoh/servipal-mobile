import { useContext } from "react";
import AccountLinkText from "@/components/AcountLink";
import CustomBtn from "@/components/CustomBtn";
import CustomTextInput from "@/components/CustomTextInput";
import TitleText from "@/components/TitleText";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@tanstack/react-query";

import { dispatchValidationSchema } from "@/utils/validations";
import InputErrorMessage from "@/components/InputErrorMessage";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import usersApi from "@/api/users";
import { CreateDispatch } from "@/utils/types";
import { router } from "expo-router";
import { Formik } from "formik";
import { Colors, themeMode } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { SIZES } from "@/constants/Sizes";

const SignUpDispatch = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { error, isSuccess, mutate, isPending } = useMutation({
    mutationFn: (user: CreateDispatch) => usersApi.createDispatch(user),
  });

  if (error) {
    showMessage({
      message: error.message,
      type: "danger",
      style: {
        alignItems: "center",
      },
    });
    router.replace('signupDispatch')

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
    <>
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
              companyName: "",
              email: "",
              phoneNumber: "",
              companyRegNum: "",
              confirmPassword: "",
              password: "",
            }}
            validationSchema={dispatchValidationSchema}
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

                    keyboardType="phone-pad"
                    onChangeText={handleChange("phoneNumber")}
                    labelColor={activeColor.text}
                    inputBackgroundColor={activeColor.inputBackground}
                    inputTextColor={activeColor.text}
                    value={values.phoneNumber}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <InputErrorMessage error={errors.phoneNumber} />
                  )}
                  <CustomTextInput
                    label="Company Name"
                    hasBorder={theme.mode !== "dark"}
                    onChangeText={handleChange("companyName")}
                    labelColor={activeColor.text}
                    inputBackgroundColor={activeColor.inputBackground}
                    inputTextColor={activeColor.text}
                    value={values.companyName}
                  />
                  {touched.companyName && errors.companyName && (
                    <InputErrorMessage error={errors.companyName} />
                  )}
                  <CustomTextInput
                    label="Company Reg No."

                    onChangeText={handleChange("companyRegNum")}
                    labelColor={activeColor.text}
                    inputBackgroundColor={activeColor.inputBackground}
                    inputTextColor={activeColor.text}
                    value={values.companyRegNum}
                  />
                  {touched.companyRegNum && errors.companyRegNum && (
                    <InputErrorMessage error={errors.companyRegNum} />
                  )}
                  <CustomTextInput
                    label="Password"

                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    labelColor={activeColor.text}
                    inputBackgroundColor={activeColor.inputBackground}
                    inputTextColor={activeColor.text}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <InputErrorMessage error={errors.password} />
                  )}
                  <CustomTextInput
                    label="Confirm Passord"
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
                  <View style={{ marginVertical: 20 }}>
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

export default SignUpDispatch;

const styles = StyleSheet.create({});
