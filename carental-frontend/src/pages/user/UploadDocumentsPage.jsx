import { useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { uploadDocuments } from "../../services/bookingService";

const UploadDocumentsPage = () => {
  const { id } = useParams();

  const [aadhaar, setAadhaar] = useState(null);

  const [license, setLicense] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadDocuments(id, aadhaar, license);

      alert("Documents uploaded successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
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
          Upload Documents
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Aadhaar</label>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setAadhaar(e.target.files[0])}
            />
          </div>

          <div>
            <label>Driving License</label>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setLicense(e.target.files[0])}
            />
          </div>

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

export default UploadDocumentsPage;
