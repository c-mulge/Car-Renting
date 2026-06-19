import MainLayout from "../../layouts/MainLayout";

import MyVehicles from "../../components/dashboard/MyVehicles";
import { Link } from "react-router-dom";
import BookingRequests from "../../components/dashboard/BookingRequests";
const OwnerDashboard = () => {
  return (
    <MainLayout>
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-12
      "
      >
        <h1
          className="
          text-4xl
          font-bold
          mb-8
        "
        >
          Owner Dashboard
        </h1>
        <div className="mb-6">
          <Link
            to="/owner/add-vehicle"
            className="
      bg-black
      text-white
      px-5
      py-3
      rounded-lg
    "
          >
            Add Vehicle
          </Link>
        </div>

        <MyVehicles />
        <div className="mt-12">
          <BookingRequests />
        </div>
      </div>
    </MainLayout>
  );
};

export default OwnerDashboard;
