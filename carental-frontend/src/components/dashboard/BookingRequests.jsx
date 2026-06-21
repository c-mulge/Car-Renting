import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getOwnerBookings,
  approveBooking,
  rejectBooking,
  // verifyDocuments,
  // rejectDocuments,
  startRental,
  completeRental,
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

      toast.success("Booking approved");

      queryClient.invalidateQueries({
        queryKey: ["owner-bookings"],
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectBooking(id);

      toast.success("Booking rejected");

      queryClient.invalidateQueries({
        queryKey: ["owner-bookings"],
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const handleStartRental = async (bookingId) => {
    try {
      await startRental(bookingId);

      toast.success("Rental started");

      queryClient.invalidateQueries({
        queryKey: ["owner-bookings"],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  const handleCompleteRental = async (bookingId) => {
    try {
      await completeRental(bookingId);

      toast.success("Rental completed");

      queryClient.invalidateQueries({
        queryKey: ["owner-bookings"],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
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
              <strong>{booking.status}</strong>
            </p>

            <p>
              Document Status:
              {booking.document?.verificationStatus || "Not Uploaded"}
            </p>

            {/* View Documents */}

            {booking.document &&
              booking.document.verificationStatus === "PENDING" && (
                <div className="mt-3">
                  <Link
                    to={`/owner/bookings/${booking.id}/documents`}
                    className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
              inline-block
            "
                  >
                    View Documents
                  </Link>
                </div>
              )}

            {/* Approve / Reject */}

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

            {/* Start Rental */}

            {booking.status === "DEPOSIT_PAID" && (
              <div className="mt-4">
                <button
                  onClick={() => handleStartRental(booking.id)}
                  className="
            bg-purple-600
            text-white
            px-4
            py-2
            rounded-lg
          "
                >
                  Start Rental
                </button>
              </div>
            )}

            {/* Complete Rental */}

            {booking.status === "ACTIVE" && (
              <div className="mt-4">
                <button
                  onClick={() => handleCompleteRental(booking.id)}
                  className="
            bg-green-700
            text-white
            px-4
            py-2
            rounded-lg
          "
                >
                  Complete Rental
                </button>
              </div>
            )}

            {/* Completed Badge */}

            {booking.status === "COMPLETED" && (
              <div className="mt-4">
                <span
                  className="
            bg-gray-200
            px-3
            py-1
            rounded-full
            text-sm
          "
                >
                  Rental Completed
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequests;
