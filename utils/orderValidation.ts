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

export const addItem = Yup.object().shape({
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
  image: Yup.string().required().label("Image"),
  images: Yup.array().min(1, "At least one image is required."),
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
