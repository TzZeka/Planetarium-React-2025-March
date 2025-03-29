import { toastError,toastSuccess } from "../../utils/toastNotifications";

import React, { useEffect } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";



const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid cosmic email address")
    .required("Cosmic Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Galactic Password is required"),
});

const LoginForm = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.email, values.password);
      toastSuccess("Welcome back, explorer of planets!");
      navigate("/profile"); // Пренасочване към профилната страница след успешно логване
    } catch (error) {
      toastError(`Login failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">
            <h2>Sign in to Spaceport</h2>
            <label>Cosmic Email:</label>
            <Field type="email" name="email" autoComplete="email" />
            <ErrorMessage name="email" component="div" className="error-message" />

            <label>Galactic Password:</label>
            <Field type="password" name="password" autoComplete="current-password" />
            <ErrorMessage name="password" component="div" className="error-message" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Enter the Universe"}
            </button>
            <p>
              Don’t have an account? <a href="/register"> Register here</a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
