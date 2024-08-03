import * as Yup from "yup";

export const orderValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  origin: Yup.string().required().label("Origin"),
  destination: Yup.string().required().label("Destination"),
  description: Yup.string().required().label("Description"),
  distance: Yup.number().positive().required().label("Distance"),
  orderPhotoUrl: Yup.string().required().label("Image"),
});

export const addMealValidation = Yup.object().shape({
  name: Yup.string().required().label("Meal name"),
  price: Yup.number().required().positive().label("Meal price"),
  category: Yup.string().required().label("Meal category"),
  side: Yup.string(),
  ingredients: Yup.string().required().label("Ingredients"),
  image: Yup.string().required().label("Image"),
});

export const DeliverySchema = Yup.object().shape({
  origin: Yup.string().required("Origin"),
  destination: Yup.string().required("Destination"),
  distance: Yup.number().positive("Distance").required("Distance"),
  additionalInfo: Yup.string(),
});
