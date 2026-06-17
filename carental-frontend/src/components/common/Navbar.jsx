import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Carental
        </Link>

        <div className="flex gap-6">
          <Link to="/">Home</Link>

          <Link to="/vehicles">Vehicles</Link>

          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
