import api from "../api/axios";

export const getOwnerDashboard = async () => {
  const response = await api.get("/dashboard/owner");
  return response.data.data;
};

export const getUserDashboard = async () => {
  const response = await api.get("/dashboard/user");
  return response.data.data;
};
