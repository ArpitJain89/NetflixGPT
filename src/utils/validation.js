import * as Yup from "yup";

export const validationObject = {
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be 50 characters or less")
    .required("Full name is required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match") // Check if it matches 'password'
    .required("Confirm Password is required"),
};

export const loginValidationSchema = Yup.object({
  email: validationObject.email,
  password: validationObject.password,
});

export const signupValidateSchema = Yup.object({
  fullName: validationObject.fullName,
  email: validationObject.email,
  password: validationObject.password,
  confirmPassword: validationObject.confirmPassword,
});
