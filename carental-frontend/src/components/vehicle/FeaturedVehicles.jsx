import { useQuery } from "@tanstack/react-query";
import VehicleCard from "./VehicleCard";
import { getVehicles } from "../../services/vehicleService";

const FeaturedVehicles = () => {
  const {
    data: vehicles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading vehicles</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold">Featured Vehicles</h2>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {vehicles?.slice(0, 3).map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
