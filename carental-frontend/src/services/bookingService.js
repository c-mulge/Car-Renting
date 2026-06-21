import api from "../api/axios";

export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);

  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/bookings/my-bookings");

  return response.data.data;
};

export const getOwnerBookings = async () => {
  const response = await api.get("/bookings/owner-bookings");

  return response.data.data;
};

export const approveBooking = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/approve`);

  return response.data;
};

export const rejectBooking = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/reject`);

  return response.data;
};

export const uploadDocuments = async (bookingId, aadhaar, license) => {
  const formData = new FormData();

  formData.append("aadhaar", aadhaar);

  formData.append("license", license);

  const response = await api.post(
    `/bookings/${bookingId}/documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const verifyDocuments = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/verify-documents`);

  return response.data;
};

export const rejectDocuments = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/reject-documents`);

  return response.data;
};

export const createDepositOrder = async (bookingId) => {
  const response = await api.post(`/bookings/${bookingId}/create-order`);

  return response.data;
};

export const mockDepositPaid = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/mock-payment`);

  return response.data;
};

export const verifyPayment = async (bookingId, paymentData) => {
  const response = await api.post(
    `/bookings/${bookingId}/verify-payment`,
    paymentData,
  );

  return response.data;
};

export const startRental = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/start-rental`);

  return response.data;
};

export const completeRental = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/complete-rental`);

  return response.data;
};
