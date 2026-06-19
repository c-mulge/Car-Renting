import api from "../api/axios";

export const getMyVehicles = async () => {
  const response = await api.get("/vehicles/my-vehicles");

  return response.data.data;
};
