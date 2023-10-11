import React, { useState, useRef } from "react";
import Header from "./Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  loginValidationSchema,
  signupValidateSchema,
} from "../utils/validation";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const inputValuesRef = useRef(initialValues);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    if (isSignInForm) {
      onSignIn(values);
    } else {
      onSignUp(values);
    }
    setSubmitting(false);
  };

  const handleInputChange = (event, setFieldValue, isSubmitting) => {
    const { name, value } = event.target;
    inputValuesRef.current = {
      ...inputValuesRef.current,
      [name]: value,
    };
    setFieldValue(name, value);
    console.log(inputValuesRef);
    if (isSubmitting) {
      console.log("is Submitting");
    }
  };

  const onSignIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/browse");
        // ...
      })
      .catch((error) => {
        setAuthError(error.message);
      });
  };

  const onSignUp = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, {
          displayName: inputValuesRef.current.fullName,
          photoURL: "https://avatars.githubusercontent.com/u/19163305?v=4",
        })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
            navigate("/browse");
          })
          .catch((error) => {
            setAuthError(error.message);
          });
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error", errorMessage);
        // ..
      });
  };

  const toggleSignInForm = (resetForm) => {
    console.log(inputValuesRef);
    inputValuesRef.current = {
      ...initialValues,
    };

    setIsSignInForm(!isSignInForm);
    resetForm();
  };

  return (
    <div className="">
      <Header />
      <div>
        <img
          className="absolute w-screen h-screen object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/893a42ad-6a39-43c2-bbc1-a951ec64ed6d/1d86e0ac-428c-4dfa-9810-5251dbf446f8/IN-en-20231002-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="BgImage"
        />
      </div>

      <div className="min-w-fit w-1/4  h-2/3 absolute bg-black px-5 py-5 flex align-middle justify-center mx-auto right-0 left-0 my-20 bg-opacity-80 text-black">
        <Formik
          initialValues={initialValues}
          validationSchema={
            isSignInForm ? loginValidationSchema : signupValidateSchema
          }
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            handleSubmit(values, { setSubmitting });
          }}
        >
          {(formikProps) => (
            <Form className="relative text-white p-10 w-full ">
              <h1 className="font-bold text-4xl mb-5 text-white">
                {" "}
                {isSignInForm ? "Sign In" : "Sign Up"}
              </h1>
              <div>
                {!isSignInForm && (
                  <>
                    <Field
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className="p-4 my-4 w-full bg-white text-black"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          formikProps.setFieldValue,
                          formikProps.isSubmitting
                        )
                      }
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </>
                )}
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="p-4 my-4 w-full bg-white text-black"
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      formikProps.setFieldValue,
                      formikProps.isSubmitting
                    )
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-4 my-4 w-full bg-white text-black"
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      formikProps.setFieldValue,
                      formikProps.isSubmitting
                    )
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>
              {!isSignInForm && (
                <>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="p-4 my-4 w-full bg-white text-black"
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        formikProps.setFieldValue,
                        formikProps.isSubmitting
                      )
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 font-semibold"
                  />
                </>
              )}
              {authError && (
                <p className="text-red-500 font-semibold">{authError}</p>
              )}
              <button
                type="submit"
                disabled={formikProps.isSubmitting}
                className="relative w-full p-4 my-20 text-3xl font-semibold bg-red-600 rounded-lg"
              >
                {isSignInForm ? "Sign In" : "Sign Up"}
              </button>
              <h2
                className="py-4 cursor-pointer"
                onClick={() => toggleSignInForm(formikProps.resetForm)}
              >
                {isSignInForm
                  ? `New to Netflix: Sign Up Now`
                  : "Already Registered? Sign In Now."}
              </h2>
              <h3>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
              </h3>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
