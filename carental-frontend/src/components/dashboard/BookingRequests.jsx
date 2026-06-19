import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import {
  getOwnerBookings,
  approveBooking,
  rejectBooking,
  verifyDocuments,
  rejectDocuments,
} from "../../services/bookingService";

const BookingRequests = () => {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["owner-bookings"],
    queryFn: getOwnerBookings,
  });

  const handleApprove = async (id) => {
    try {
      await approveBooking(id);

      alert("Booking approved");

      queryClient.invalidateQueries({
        queryKey: ["owner-bookings"],
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectBooking(id);

      alert("Booking rejected");

      queryClient.invalidateQueries({
        queryKey: ["owner-bookings"],
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  const handleVerifyDocuments = async (bookingId) => {
    try {
      await verifyDocuments(bookingId);

      alert("Documents verified");

      queryClient.invalidateQueries({
        queryKey: ["owner-bookings"],
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleRejectDocuments = async (bookingId) => {
    try {
      await rejectDocuments(bookingId);

      alert("Documents rejected");

      queryClient.invalidateQueries({
        queryKey: ["owner-bookings"],
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2
        className="
        text-2xl
        font-bold
        mb-6
        "
      >
        Booking Requests
      </h2>

      <div className="space-y-4">
        {bookings?.map((booking) => (
          <div
            key={booking.id}
            className="
                border
                rounded-xl
                p-4
              "
          >
            <h3>{booking.user?.fullName}</h3>

            <p>
              Vehicle:
              {booking.vehicle?.name}
            </p>

            <p>
              Status:
              {booking.status}
            </p>
            <p>
              Document Status:
              {booking.document?.verificationStatus || "Not Uploaded"}
            </p>
            {booking.document &&
              booking.document.verificationStatus === "PENDING" && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleVerifyDocuments(booking.id)}
                    className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded-lg
      "
                  >
                    Verify Docs
                  </button>

                  <button
                    onClick={() => handleRejectDocuments(booking.id)}
                    className="
      bg-orange-600
      text-white
      px-4
      py-2
      rounded-lg
      "
                  >
                    Reject Docs
                  </button>
                </div>
              )}

            {booking.status === "PENDING" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleApprove(booking.id)}
                  className="
                    bg-green-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    "
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(booking.id)}
                  className="
                    bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    "
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequests;
