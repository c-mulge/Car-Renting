import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { createVehicle } from "../../services/vehicleService";

const AddVehiclePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    vehicleType: "",
    fuelType: "",
    transmission: "",
    seatingCapacity: "",
    pricePerKm: "",
    securityDeposit: "",
    pickupLocation: "",
    description: "",
    registrationNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        year: Number(formData.year),
        seatingCapacity: Number(formData.seatingCapacity),
        pricePerKm: Number(formData.pricePerKm),
        securityDeposit: Number(formData.securityDeposit),
      };

      await createVehicle(payload);

      alert("Vehicle created successfully");

      navigate("/owner");
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  return (
    <MainLayout>
      <div
        className="
        max-w-3xl
        mx-auto
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
          Add Vehicle
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Vehicle Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="model"
            placeholder="Model"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <select
            name="vehicleType"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Vehicle Type</option>

            <option value="SEDAN">Sedan</option>

            <option value="SUV">SUV</option>

            <option value="HATCHBACK">Hatchback</option>
          </select>

          <select
            name="fuelType"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Fuel Type</option>

            <option value="PETROL">Petrol</option>

            <option value="DIESEL">Diesel</option>

            <option value="ELECTRIC">Electric</option>
          </select>
          <select
            name="transmission"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Transmission</option>

            <option value="MANUAL">Manual</option>

            <option value="AUTOMATIC">Automatic</option>
          </select>
          <input
            type="number"
            name="seatingCapacity"
            placeholder="Seating Capacity"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="registrationNumber"
            placeholder="Registration Number"
            onChange={handleChange}
            className="
            w-full
            border
            p-3
            rounded-lg
            "
          />
          <input
            type="number"
            name="pricePerKm"
            placeholder="Price Per Km"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="number"
            name="securityDeposit"
            placeholder="Security Deposit"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <input
            name="pickupLocation"
            placeholder="Pickup Location"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Vehicle Description"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            className="
            bg-black
            text-white
            px-6
            py-3
            rounded-lg
            "
          >
            Create Vehicle
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddVehiclePage;
