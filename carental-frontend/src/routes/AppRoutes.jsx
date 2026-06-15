import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import RegisterUser from "../pages/RegisterUser/RegisterUser";
import RegisterOwner from "../pages/RegisterOwner/RegisterOwner";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register-user" element={<RegisterUser />} />

        <Route path="/register-owner" element={<RegisterOwner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
