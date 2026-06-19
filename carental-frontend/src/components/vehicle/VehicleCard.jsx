import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
      <div className="h-48 bg-gray-200">
        {vehicle.images?.[0] ? (
          <img
            src={vehicle.images[0].imageUrl}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg">{vehicle.name}</h3>

        <p className="text-gray-500">{vehicle.brand}</p>

        <div className="mt-4 flex justify-between">
          <span>₹{vehicle.pricePerKm}/km</span>

          <span>{vehicle.pickupLocation}</span>
        </div>

        <Link
          to={`/vehicles/${vehicle.id}`}
          className="
            mt-4
            block
            text-center
            bg-black
            text-white
            py-2
            rounded-lg
          "
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
