import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import VehiclesPage from "../pages/public/VehiclesPage";
import VehicleDetailsPage from "../pages/public/VehicleDetailsPage";
import MyBookingsPage from "../pages/user/MyBookingsPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
