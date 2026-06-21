import { useQuery } from "@tanstack/react-query";

import MainLayout from "../../layouts/MainLayout";

import {
  getMyBookings,
  createDepositOrder,
  verifyPayment,
} from "../../services/bookingService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyBookingsPage = () => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const handleDepositPayment = async (bookingId) => {
    try {
      const orderResponse = await createDepositOrder(bookingId);

      console.log("Order Created:", orderResponse);

      const order = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "Carental",

        description: "Security Deposit",

        handler: async (response) => {
          await verifyPayment(bookingId, response);

          toast.success("Deposit paid successfully");

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

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
              <p>Security Deposit: ₹{booking.vehicle?.securityDeposit}</p>
              {booking.status === "APPROVED" && (
                <button
                  onClick={() => handleDepositPayment(booking.id)}
                  className="
    mt-4
    bg-green-600
    text-white
    px-4
    py-2
    rounded-lg
    "
                >
                  Pay ₹{booking.vehicle?.securityDeposit}
                  Deposit
                </button>
              )}
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
