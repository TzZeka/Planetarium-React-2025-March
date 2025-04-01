import React from "react";
import { Routes, Route } from "react-router"; 
import Home from "../pages/Home/home";
import About from "../pages/About/about";
import Contacts from "../pages/Contacts/contacts";

import Create from "../services/PlanetService/Create";


import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "../components/Profile/ProfilePage";
import Planets from "../pages/Planets/planets";
import FavouritesList from './../components/Favourites/FavouritesList';
import NotFound404 from "../components/NotFound404/NotFound";
import PublicRoute from "./PublicRoute";
import MyPlanetsPage from "../components/Profile/MyPlanets";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публични маршрути */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/planets" element={<Planets />} />
      <Route path="*" element={<NotFound404/>} />


      <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
      </Route>

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
        path="/favourites"
        element={
          <ProtectedRoute>
            <FavouritesList />
          </ProtectedRoute>
        }
      />
      <Route path="/my-planets" 
      element={<MyPlanetsPage/>} />
    </Routes>
  );
};

export default AppRoutes;
