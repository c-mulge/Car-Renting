import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import NotificationBell from "../common/NotificationBell";

const Navbar = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Carental
        </Link>

        <div className="flex gap-6 items-center">
          {user && <NotificationBell />}
          <Link to="/">Home</Link>

          <Link to="/vehicles">Vehicles</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>
            </>
          )}

          {user && (
            <>
              <span className="font-medium">{user.fullName}</span>

              {user.role === "USER" && (
                <Link to="/my-bookings">My Bookings</Link>
              )}

              {user.role === "OWNER" && (
                <Link to="/owner">Owner Dashboard</Link>
              )}

              {user.role === "ADMIN" && (
                <Link to="/admin">Admin Dashboard</Link>
              )}

              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
