import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

import useAuthStore from "../../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await loginUser({
        email,
        password,
      });

      login(userData);

      if (userData.role === "ADMIN") {
        navigate("/admin");
      } else if (userData.role === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/my-bookings");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="
      max-w-md
      mx-auto
      mt-20
    "
    >
      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
          w-full
          border
          p-3
          rounded-lg
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
          w-full
          border
          p-3
          rounded-lg
          "
        />

        <button
          className="
          w-full
          bg-black
          text-white
          py-3
          rounded-lg
          "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
