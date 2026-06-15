import prisma from "../prisma/prismaClient.js";

export const addVehicle = async (req, res) => {
  try {
    const {
      name,
      brand,
      model,
      year,
      vehicleType,
      fuelType,
      transmission,
      seatingCapacity,
      pricePerKm,
      securityDeposit,
      pickupLocation,
      description,
      registrationNumber,
    } = req.body;

    const vehicle = await prisma.vehicle.create({
      data: {
        ownerId: req.user.id,
        name,
        brand,
        model,
        year,
        vehicleType,
        fuelType,
        transmission,
        seatingCapacity,
        pricePerKm,
        securityDeposit,
        pickupLocation,
        description,
        registrationNumber,
      },
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
