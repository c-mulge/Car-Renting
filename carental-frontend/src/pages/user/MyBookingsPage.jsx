import { useQuery } from "@tanstack/react-query";

import MainLayout from "../../layouts/MainLayout";

import { getMyBookings } from "../../services/bookingService";
import { Link } from "react-router-dom";

const MyBookingsPage = () => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">My Bookings</h1>

        <div className="mt-8 space-y-4">
          {bookings?.map((booking) => (
            <div
              key={booking.id}
              className="
                  border
                  rounded-xl
                  p-4
                "
            >
              <h3>{booking.vehicle?.name}</h3>

              <p>
                Status:
                {booking.status}
              </p>
              <Link
                to={`/bookings/${booking.id}/documents`}
                className="
    inline-block
    mt-3
    bg-black
    text-white
    px-4
    py-2
    rounded-lg
  "
              >
                Upload Documents
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyBookingsPage;
