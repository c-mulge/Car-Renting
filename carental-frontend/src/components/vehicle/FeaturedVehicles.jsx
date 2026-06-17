const FeaturedVehicles = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold">Featured Vehicles</h2>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="border rounded-xl p-4">Swift Dzire</div>

        <div className="border rounded-xl p-4">Hyundai Creta</div>

        <div className="border rounded-xl p-4">Kia Seltos</div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
