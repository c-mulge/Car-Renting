import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";

import {
  getOwnerBookings,
  verifyDocuments,
  rejectDocuments,
} from "../../services/bookingService";

const BookingDocumentsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: bookings } = useQuery({
    queryKey: ["owner-bookings"],
    queryFn: getOwnerBookings,
  });

  const booking = bookings?.find((b) => b.id === id);

  if (!booking) {
    return <p>Booking not found</p>;
  }

  const handleVerify = async () => {
    try {
      setLoading(true);

      await verifyDocuments(booking.id);

      toast.success("Documents verified");

      setTimeout(() => {
        navigate("/owner");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);

      await rejectDocuments(booking.id);

      toast.success("Documents rejected");

      setTimeout(() => {
        navigate("/owner");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Rejection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div
        className="
        max-w-4xl
        mx-auto
        py-12
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-8
          "
        >
          Review Documents
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2>Aadhaar</h2>

            <img src={booking.document?.aadhaarUrl} alt="Aadhaar" />
          </div>

          <div>
            <h2>Driving License</h2>

            <img src={booking.document?.drivingLicenseUrl} alt="License" />
          </div>
        </div>

        {booking.document?.verificationStatus === "PENDING" ? (
          <div
            className="
    flex
    gap-4
    mt-8
    "
          >
            <button
              onClick={handleVerify}
              disabled={loading}
              className="
      bg-green-600
      text-white
      px-5
      py-3
      rounded-lg
      "
            >
              {loading ? "Processing..." : "Verify"}
            </button>

            <button
              onClick={handleReject}
              disabled={loading}
              className="
      bg-red-600
      text-white
      px-5
      py-3
      rounded-lg
      "
            >
              {loading ? "Processing..." : "Reject"}
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <p
              className="
      text-lg
      font-semibold
      "
            >
              Document Status:
              {booking.document?.verificationStatus}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BookingDocumentsPage;
