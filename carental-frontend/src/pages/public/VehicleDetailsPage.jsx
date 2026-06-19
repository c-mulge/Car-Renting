import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import MainLayout from "../../layouts/MainLayout";

import { getVehicleById } from "../../services/vehicleService";
import BookingForm from "../../components/booking/BookingForm";

import { createBooking } from "../../services/bookingService";
import toast from "react-hot-toast";

const VehicleDetailsPage = () => {
  const { id } = useParams();

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleById(id),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!vehicle) {
    return <p>Vehicle not found</p>;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            {vehicle.images?.[0] && (
              <img
                src={vehicle.images[0].imageUrl}
                alt={vehicle.name}
                className="
                  w-full
                  rounded-2xl
                "
              />
            )}
          </div>

          <div>
            <h1
              className="
              text-4xl
              font-bold
            "
            >
              {vehicle.name}
            </h1>

            <p className="mt-3">{vehicle.brand}</p>

            <p>Model: {vehicle.model}</p>

            <p>Year: {vehicle.year}</p>

            <p>Fuel Type: {vehicle.fuelType}</p>

            <p>Transmission: {vehicle.transmission}</p>

            <p>Seats: {vehicle.seatingCapacity}</p>
            <p className="mt-6">Price: ₹{vehicle.pricePerKm}/km</p>

            <p>Deposit: ₹{vehicle.securityDeposit}</p>

            <p>
              Location:
              {vehicle.pickupLocation}
            </p>

            <BookingForm vehicleId={vehicle.id} onSubmit={handleBooking} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const handleBooking = async (bookingData) => {
  try {
    const result = await createBooking(bookingData);

    toast.success("Booking created successfully");

    console.log(result);
  } catch (error) {
    toast.error(error?.response?.data?.message || "Booking failed");
  }
};

export default VehicleDetailsPage;
