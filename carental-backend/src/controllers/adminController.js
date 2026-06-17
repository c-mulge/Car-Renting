import prisma from "../prisma/prismaClient.js";
import asyncHandler from "../utils/asyncHandler.js";

import { successResponse, errorResponse } from "../utils/apiResponse.js";
export const getAdminDashboard = asyncHandler(async (req, res) => {
  const totalUsers = await prisma.user.count({
    where: {
      role: "USER",
    },
  });

  const totalOwners = await prisma.user.count({
    where: {
      role: "OWNER",
    },
  });

  const totalVehicles = await prisma.vehicle.count({
    where: {
      isDeleted: false,
    },
  });

  const totalBookings = await prisma.booking.count();

  const completedBookings = await prisma.booking.count({
    where: {
      status: "COMPLETED",
    },
  });

  const activeRentals = await prisma.booking.count({
    where: {
      status: "ACTIVE",
    },
  });

  const completedRentalData = await prisma.booking.findMany({
    where: {
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

  return successResponse(res, 200, "Admin dashboard fetched", {
    totalUsers,
    totalOwners,
    totalVehicles,
    totalBookings,
    completedBookings,
    activeRentals,
    totalRevenue,
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      isBlocked: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return successResponse(res, 200, "Users fetched successfully", users);
});

export const getAllVehiclesAdmin = asyncHandler(async (req, res) => {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      owner: {
        select: {
          fullName: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return successResponse(res, 200, "Vehicles fetched successfully", vehicles);
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await prisma.booking.findMany({
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
        },
      },

      vehicle: {
        select: {
          name: true,
          registrationNumber: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return successResponse(res, 200, "Bookings fetched successfully", bookings);
});

export const blockUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    return errorResponse(res, 404, "User not found");
  }

  if (user.role === "ADMIN") {
    return errorResponse(res, 400, "Cannot block admin account");
  }

  if (user.id === req.user.id) {
    return errorResponse(res, 400, "Cannot block your own account");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: req.params.id,
    },

    data: {
      isBlocked: true,
    },
  });

  return successResponse(res, 200, "User blocked successfully", updatedUser);
});

export const unblockUser = asyncHandler(async (req, res) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!existingUser) {
    return errorResponse(res, 404, "User not found");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: req.params.id,
    },

    data: {
      isBlocked: false,
    },
  });

  return successResponse(res, 200, "User unblocked successfully", updatedUser);
});
