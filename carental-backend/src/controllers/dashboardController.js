import prisma from "../prisma/prismaClient.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

export const getOwnerDashboard = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;

  const totalVehicles = await prisma.vehicle.count({
    where: {
      ownerId,
      isDeleted: false,
    },
  });

  const availableVehicles = await prisma.vehicle.count({
    where: {
      ownerId,
      availabilityStatus: true,
      isDeleted: false,
    },
  });

  const pendingBookings = await prisma.booking.count({
    where: {
      vehicle: {
        ownerId,
      },
      status: "PENDING",
    },
  });

  const activeRentals = await prisma.booking.count({
    where: {
      vehicle: {
        ownerId,
      },
      status: "ACTIVE",
    },
  });

  const completedBookings = await prisma.booking.count({
    where: {
      vehicle: {
        ownerId,
      },
      status: "COMPLETED",
    },
  });

  const completedRentalData = await prisma.booking.findMany({
    where: {
      vehicle: {
        ownerId,
      },
      status: "COMPLETED",
    },

    select: {
      finalAmount: true,
    },
  });

  const totalRevenue = completedRentalData.reduce(
    (sum, booking) => sum + (booking.finalAmount || 0),
    0,
  );

  return successResponse(res, 200, "Dashboard data fetched", {
    totalVehicles,
    availableVehicles,
    pendingBookings,
    activeRentals,
    completedBookings,
    totalRevenue,
  });
});

export const getUserDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const totalBookings = await prisma.booking.count({
    where: {
      userId,
    },
  });

  const activeRentals = await prisma.booking.count({
    where: {
      userId,
      status: "ACTIVE",
    },
  });

  const completedBookings = await prisma.booking.count({
    where: {
      userId,
      status: "COMPLETED",
    },
  });

  const cancelledBookings = await prisma.booking.count({
    where: {
      userId,
      status: "CANCELLED",
    },
  });

  return successResponse(res, 200, "Dashboard data fetched", {
    totalBookings,
    activeRentals,
    completedBookings,
    cancelledBookings,
  });
});
