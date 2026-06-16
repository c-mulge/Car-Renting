import prisma from "../prisma/prismaClient.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { vehicleId, pickupDate, returnDate } = req.body;

  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
  });

  if (!vehicle) {
    return errorResponse(res, 404, "Vehicle not found");
  }

  // Date conflict check
  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      vehicleId,

      status: {
        in: ["PENDING", "APPROVED", "ACTIVE"],
      },

      AND: [
        {
          pickupDate: {
            lte: new Date(returnDate),
          },
        },
        {
          returnDate: {
            gte: new Date(pickupDate),
          },
        },
      ],
    },
  });

  if (conflictingBooking) {
    return errorResponse(res, 400, "Vehicle already booked for selected dates");
  }

  const booking = await prisma.booking.create({
    data: {
      vehicleId,
      userId: req.user.id,
      pickupDate: new Date(pickupDate),
      returnDate: new Date(returnDate),
      status: "PENDING",
    },
  });

  return successResponse(res, 201, "Booking request created", booking);
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: {
      userId: req.user.id,
    },

    include: {
      vehicle: true,
    },
  });

  return successResponse(res, 200, "Bookings fetched", bookings);
});

export const getOwnerBookings = asyncHandler(async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: {
      vehicle: {
        ownerId: req.user.id,
      },
    },

    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },

      vehicle: true,
    },
  });

  return successResponse(res, 200, "Owner bookings fetched", bookings);
});

export const approveBooking = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: req.params.id,
    },

    include: {
      vehicle: true,
    },
  });

  if (!booking) {
    return errorResponse(res, 404, "Booking not found");
  }

  if (booking.vehicle.ownerId !== req.user.id) {
    return errorResponse(res, 403, "Unauthorized");
  }
  if (booking.status !== "PENDING") {
    return errorResponse(res, 400, "Booking already processed");
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },

    data: {
      status: "APPROVED",
    },
  });

  return successResponse(res, 200, "Booking approved", updatedBooking);
});

export const rejectBooking = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: req.params.id,
    },

    include: {
      vehicle: true,
    },
  });

  if (!booking) {
    return errorResponse(res, 404, "Booking not found");
  }

  if (booking.vehicle.ownerId !== req.user.id) {
    return errorResponse(res, 403, "Unauthorized");
  }
  if (booking.status !== "PENDING") {
    return errorResponse(res, 400, "Booking already processed");
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },

    data: {
      status: "REJECTED",
    },
  });

  return successResponse(res, 200, "Booking rejected", updatedBooking);
});
