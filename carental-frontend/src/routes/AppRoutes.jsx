import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import VehiclesPage from "../pages/public/VehiclesPage";
import VehicleDetailsPage from "../pages/public/VehicleDetailsPage";
import MyBookingsPage from "../pages/user/MyBookingsPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import AddVehiclePage from "../pages/owner/AddVehiclePage";
import AddVehicleImagePage from "../pages/owner/AddVehicleImagePage";
import UploadDocumentsPage from "../pages/user/UploadDocumentsPage";
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
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/owner"
          element={
            <RoleProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/add-vehicle"
          element={
            <RoleProtectedRoute allowedRoles={["OWNER"]}>
              <AddVehiclePage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/owner/vehicles/:id/upload-image"
          element={
            <RoleProtectedRoute allowedRoles={["OWNER"]}>
              <AddVehicleImagePage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/bookings/:id/documents"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <UploadDocumentsPage />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
