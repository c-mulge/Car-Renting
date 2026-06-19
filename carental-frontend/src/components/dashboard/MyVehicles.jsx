import { useQuery } from "@tanstack/react-query";

import { getMyVehicles } from "../../services/ownerService";
import { Link } from "react-router-dom";

const MyVehicles = () => {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["owner-vehicles"],
    queryFn: getMyVehicles,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2
        className="
        text-2xl
        font-bold
        mb-6
      "
      >
        My Vehicles
      </h2>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
      "
      >
        {vehicles?.map((vehicle) => (
          <div key={vehicle.id} className="border rounded-xl overflow-hidden">
            {vehicle.images?.[0]?.imageUrl ? (
              <img
                src={vehicle.images[0].imageUrl}
                alt={vehicle.name}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="h-48 flex items-center justify-center bg-gray-100">
                No Image
              </div>
            )}

            <div className="p-4">
              <h3 className="font-bold text-lg">{vehicle.name}</h3>

              <p>{vehicle.brand}</p>

              <p>₹{vehicle.pricePerKm}/km</p>

              <div className="mt-3">
                {vehicle.isDeleted ? (
                  <span className="text-red-500">Deleted</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </div>
              <Link
                to={`/owner/vehicles/${vehicle.id}/upload-image`}
                className="
    mt-4
    inline-block
    bg-black
    text-white
    px-4
    py-2
    rounded-lg
  "
              >
                Upload Image
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVehicles;
