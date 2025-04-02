import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router"; // Поправен импорт за navigate
import { toastError, toastSuccess } from "../../utils/toastNotifications";

const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid galactic email address")
    .required("Galactic Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Stellar Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirmation Password is required"),
});

const RegisterForm = () => {
  const { register, user } = useAuth(); // Извличаме потребителя от контекста
  const navigate = useNavigate();

  // Пренасочване, ако потребителят е логнат
  React.useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]); // Следим промените в `user`
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register(values.email, values.password); // Регистрацията НЕ логва
      toastSuccess("Registration successful! Please log in.");
      navigate("/login"); // Пренасочване към страницата за вход
    } catch (error) {
      toastError(`Registration failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">
            <h2>Register as a Planet Explorer</h2>
            <label>Galactic Email:<p className="special-label">Required</p></label>
            <Field type="email" name="email" autoComplete="email" />
            <ErrorMessage name="email" component="div" className="error-message" />

            <label>Create Stellar Password:<p className="special-label">Required</p></label>
            <Field type="password" name="password" autoComplete="new-password" />
            <ErrorMessage name="password" component="div" className="error-message" />

            <label>Confirm Stellar Password:<p className="special-label">Required</p></label>
            <Field type="password" name="confirmPassword" autoComplete="new-password" />
            <ErrorMessage name="confirmPassword" component="div" className="error-message" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Join the Mission"}
            </button>

            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
