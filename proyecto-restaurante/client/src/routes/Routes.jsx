import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/templates/Login.jsx";
import Register from "../components/templates/Register.jsx";
import Home from "../pages/Home.jsx";
import NavBar from "../components/templates/navBar.jsx";
import Footer from "../components/templates/Footer.jsx";
import RestaurantPage from "../pages/RestaurantPage.jsx";
import ThemeProvider from "../context/ThemeContext";
import Profile from "../pages/Profile.jsx";
import ReservationPage from "../pages/ReservationPage.jsx";
import ProtectedRoute from "./ProtectedRoute";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <ThemeProvider>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated
                element={<Login />}
                redirectTo="/profile"
              />
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfAuthenticated
                element={<Register />}
                redirectTo="/profile"
              />
            }
          />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservation" element={<ReservationPage/>} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/reservations"
            element={<ProtectedRoute element={<ReservationPage />} />}
          />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default AppRoutes;
