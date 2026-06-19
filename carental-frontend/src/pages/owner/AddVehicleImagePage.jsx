import { useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { uploadVehicleImage } from "../../services/vehicleService";
import toast from "react-hot-toast";

const AddVehicleImagePage = () => {
  const { id } = useParams();

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadVehicleImage(id, image);

      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <MainLayout>
      <div
        className="
        max-w-xl
        mx-auto
        py-12
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-6
          "
        >
          Upload Vehicle Image
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="
              mb-4
            "
          />

          <button
            className="
              bg-black
              text-white
              px-5
              py-3
              rounded-lg
            "
          >
            Upload
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddVehicleImagePage;
