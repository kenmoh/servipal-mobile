import * as Yup from "yup";

export const orderValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  origin: Yup.string().required().label("Origin"),
  destination: Yup.string().required().label("Destination"),
  description: Yup.string().required().label("Description"),
  distance: Yup.number()
    .positive()
    .required()
    .label("Distance")
    .typeError("Enter a valid number!"),
  orderPhotoUrl: Yup.string().required().label("Image"),
});

export const addMealValidation = Yup.object().shape({
  name: Yup.string().required().label("Meal name"),
  price: Yup.number()
    .required()
    .positive()
    .label("Meal price")
    .typeError("Enter a valid number!"),
  category: Yup.string().required().label("Meal category"),
  side: Yup.string(),
  ingredients: Yup.string().required().label("Ingredients"),
  image: Yup.string().required().label("Image"),
  preparationTime: Yup.number(),
});

export const addLaundryValidation = Yup.object().shape({
  name: Yup.string().required().label("Item name"),
  price: Yup.number()
    .required()
    .positive()
    .label("Price")
    .typeError("Enter a valid number!"),
  image: Yup.string().required().label("Image"),
});

export const addItemValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Item name"),
  price: Yup.number()
    .required()
    .positive()
    .label("Price")
    .typeError("Enter a valid number!"),
  stock: Yup.number()
    .required()
    .positive()
    .label("Stock")
    .typeError("Enter a valid number!"),
  description: Yup.string().required().label("Description"),
  images: Yup.array().min(1, "At least one image is required."),
  colors: Yup.array(),
  sizes: Yup.array(),
});

export const DeliverySchema = Yup.object().shape({
  origin: Yup.string().required("Origin"),
  destination: Yup.string().required("Destination"),
  distance: Yup.number()
    .positive("Distance")
    .required("Distance")
    .typeError("Enter a valid number!"),
  additionalInfo: Yup.string(),
});

export const RatingValidationSchema = Yup.object().shape({
  rating: Yup.number().min(1).max(5).positive("Rating"),
  comment: Yup.string().required(),
});
export const CategoryValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
});

export const SetupCompanyValidation = Yup.object().shape({
  location: Yup.string().required().label("Location"),
  accountHolderName: Yup.string().required().label("Beneficiary Name"),
  bankName: Yup.string().required().label("Bank Name"),
  accountNumber: Yup.string().required().label("Account Number"),
  companyName: Yup.string().required().label("Company Name"),
  companyRegNum: Yup.string(),
  openingHour: Yup.string().required().label("Opening hour"),
  closingHour: Yup.string().required().label("Closing hour"),
});

export const DisputeValidation = Yup.object().shape({
  subject: Yup.string().required().label("Subject"),
  content: Yup.string().required().label("Content"),
  disputedUser: Yup.string().required().label("Content"),
});
export const ResponseValidation = Yup.object().shape({
  content: Yup.string().required().label("Content"),
});

export const SearchValidation = Yup.object().shape({
  startDate: Yup.string().required().label("Start Date"),
  endDate: Yup.string().required().label("End Date"),
  orderType: Yup.string().required().label("Order Type"),
});
