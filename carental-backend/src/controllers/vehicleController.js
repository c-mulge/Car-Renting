import prisma from "../prisma/prismaClient.js";

import asyncHandler from "../utils/asyncHandler.js";

import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const addVehicle = asyncHandler(async (req, res) => {
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

  const existingVehicle = await prisma.vehicle.findUnique({
    where: {
      registrationNumber,
    },
  });

  if (existingVehicle) {
    return errorResponse(res, 400, "Vehicle already exists");
  }

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

  return successResponse(res, 201, "Vehicle added successfully", vehicle);
});

export const getAllVehicles = asyncHandler(async (req, res) => {
  const { location, vehicleType, fuelType, minPrice, maxPrice } = req.query;

  const filters = {
    availabilityStatus: true,
  };

  if (location) {
    filters.pickupLocation = {
      contains: location,
      mode: "insensitive",
    };
  }

  if (vehicleType) {
    filters.vehicleType = vehicleType;
  }

  if (fuelType) {
    filters.fuelType = fuelType;
  }

  if (minPrice || maxPrice) {
    filters.pricePerKm = {};

    if (minPrice) {
      filters.pricePerKm.gte = Number(minPrice);
    }

    if (maxPrice) {
      filters.pricePerKm.lte = Number(maxPrice);
    }
  }

  const vehicles = await prisma.vehicle.findMany({
    where: filters,

    include: {
      owner: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
  });

  return successResponse(res, 200, "Vehicles fetched successfully", vehicles);
});

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
