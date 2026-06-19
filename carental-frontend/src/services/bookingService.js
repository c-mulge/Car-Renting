import api from "../api/axios";

export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);

  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/bookings/my-bookings");

  return response.data.data;
};
