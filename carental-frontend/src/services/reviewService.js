import api from "../api/axios";

export const getVehicleReviews = async (vehicleId) => {
  const response = await api.get(`/reviews/vehicle/${vehicleId}`);

  return response.data.data;
};

export const getRatingSummary = async (vehicleId) => {
  const response = await api.get(`/reviews/vehicle/${vehicleId}/summary`);

  return response.data.data;
};
