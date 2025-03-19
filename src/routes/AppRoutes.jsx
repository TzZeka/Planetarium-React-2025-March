import React from "react";
import { Routes, Route } from "react-router"; // Използваме Routes и Route от react-router
import Home from "../pages/Home/home";
import About from "../pages/About/about";
import Contacts from "../pages/Contacts/contacts";

import Create from "../components/CreateEditDelete/Create";
import Edit from "../components/CreateEditDelete/Edit";
import Delete from "../components/CreateEditDelete/Delete";
import Favourites from "../components/Favourites/Favourites";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публични маршрути */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Защитени маршрути */}
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:itemId"
        element={
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/delete/:itemId"
        element={
          <ProtectedRoute>
            <Delete />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favourites"
        element={
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
