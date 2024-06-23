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
  username: Yup.string().required().label("Username"),
  plateNumber: Yup.string().required().label("Plate number is required"),
  location: Yup.string().required().label("Location is required"),
  fullName: Yup.string().required().label("Full Name is required"),
  profilePhoto: Yup.string().required().label("Profile image is required"),
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
export const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
});

export const accountValidationSchema = Yup.object().shape({
  emailCode: Yup.string().required().min(5).max(6).label("Email Code"),
  phoneCode: Yup.string().required().min(5).max(6).label("Phone Code"),
});
