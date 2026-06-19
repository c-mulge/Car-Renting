import api from "../api/axios";

export const createVehicle = async (vehicleData) => {
  const response = await api.post("/vehicles", vehicleData);

  return response.data;
};

export const uploadVehicleImage = async (vehicleId, imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await api.post(`/vehicles/${vehicleId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getVehicles = async () => {
  const response = await api.get("/vehicles");

  return response.data.data;
};

export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicles/${id}`);

  return response.data;
};
