import { useQuery } from "@tanstack/react-query";

import { getVehicles } from "../../services/vehicleService";

import VehicleCard from "../../components/vehicle/VehicleCard";

import MainLayout from "../../layouts/MainLayout";

const VehiclesPage = () => {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">Explore Vehicles</h1>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {vehicles?.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default VehiclesPage;
