import MainLayout from "../../layouts/MainLayout";

import HeroSection from "../../components/common/HeroSection";

import FeaturedVehicles from "../../components/vehicle/FeaturedVehicles";

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />

      <FeaturedVehicles />
    </MainLayout>
  );
};

export default HomePage;
