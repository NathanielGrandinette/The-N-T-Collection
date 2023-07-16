import * as yup from "yup";
import { ref } from "yup";

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is Required"),
  name: yup
    .string()
    .max(30, "Must be 15 characters or less")
    .min(2, "Must be at least 2 characters.")
    .required("Name is Required"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(7, "Password must be at least 7 characters"),
  confirmPassword: yup
    .string()
    .required("Please re-type your new password")
    .oneOf(
      [ref("password")],
      "Password and Confirm Password don't match."
    ),
  currPassword: yup
    .string()
    .required("current password is required to make these changes."),

  zip: yup
    .string()
    .matches(/^\d{5}(-\d{4})?$/, "Invalid zip code")
    .required("Zip code is required"),
  city: yup
    .string()
    .min(2, "City must be at least 2 characters")
    .max(20, "City can only be at most 20 characters.")
    .required("City is required."),
  state: yup
    .string()
    .max(2, "State must be 2 characters, e.g. 'FL' ")
    .matches(/^[A-Z]{2}$/, "Invalid state abbreviation"),
  address: yup.string().required("Street address is required."),
});
