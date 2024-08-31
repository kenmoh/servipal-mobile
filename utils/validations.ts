import * as Yup from "yup";

const phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const vendorValidationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
  username: Yup.string().required().label("Email"),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegEx, "Enter a valid phone number")
    .max(11)
    .min(10)
    .label("Phone Number"),
  password: Yup.string().required().label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null!], "Passwords must match")
    .required()
    .label("Confirm Password"),
});

export const signInValidationSchema = Yup.object().shape({
  username: Yup.string().email().trim().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

export const dispatchValidationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
  companyName: Yup.string().required().label("Company Name"),
  companyRegNum: Yup.string(),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegEx, "Enter a valid phone number")
    .max(11)
    .min(10)
    .label("Phone Number"),
  password: Yup.string().required().label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null!], "Passwords must match")
    .required()
    .label("Confirm Password"),
});

export const riderValidationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
  plateNumber: Yup.string().required().label("Plate number is required"),
  fullName: Yup.string().required().label("Full Name is required"),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegEx, "Enter a valid phone number")
    .max(11)
    .min(10)
    .label("Phone Number"),
  password: Yup.string().required().label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null!], "Passwords must match")
    .required()
    .label("Confirm Password"),
});

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().email().trim().required().label("Email"),
  password: Yup.string().required().label("Password"),
});
export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required().label("Old Password"),
  newPassword: Yup.string().required().label("New Password"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null!], "Passwords must match")
    .required()
    .label("Confirm New Password"),
});
export const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
});
export const walletValidationSchema = Yup.object().shape({
  amount: Yup.number().required().min(1000).label("Amount"),
});

export const accountValidationSchema = Yup.object().shape({
  emailCode: Yup.string().required().min(5).max(6).label("Email Code"),
  phoneCode: Yup.string().required().min(5).max(6).label("Phone Code"),
});

export const userUpdateValidationSchema = Yup.object().shape({
  fullName: Yup.string(),
  companyRegNum: Yup.string(),
  bankAccountNumber: Yup.number()
    .required()
    .max(9999999999)
    .positive()
    .label("Account Number"),
  accountHolderName: Yup.string().required().label("Account Holder Name"),
  bankName: Yup.string().required().label("Bank Name"),
});
