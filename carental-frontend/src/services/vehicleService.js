import api from "../api/axios";

export const getVehicles = async () => {
  const response = await api.get("/vehicles");

  return response.data.data;
};

export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicles/${id}`);

  return response.data;
};
