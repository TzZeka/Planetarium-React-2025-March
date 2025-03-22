// utils/validation.js
import * as Yup from "yup";

// Схема за валидиране на имейл и парола при логин
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
});

// Схема за валидиране на регистрация
export const registerValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  username: Yup.string().min(3, "Username must be at least 3 characters long").required("Username is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
});

// Схема за валидиране на създаване/редакция на елемент
export const itemValidationSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title must be at least 3 characters long").required("Title is required"),
  description: Yup.string().min(10, "Description must be at least 10 characters long").required("Description is required"),
});
