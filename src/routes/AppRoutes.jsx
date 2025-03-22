import React from "react";
import { Routes, Route } from "react-router"; 
import Home from "../pages/Home/home";
import About from "../pages/About/about";
import Contacts from "../pages/Contacts/contacts";

import Create from "../components/CRUD/Create";
import Edit from "../components/CRUD/Edit";

import Favourites from "../components/Favourites/Favourites";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "../components/Profile/ProfilePage";
import Planets from "../pages/Planets/planets";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публични маршрути */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/planets" element={<Planets />} />

      {/* Защитени маршрути */}
      <Route
        path="/profile"
        element={ 
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
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
        path="/edit/:itemId"
        element={
          <ProtectedRoute>
            <Edit />
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
