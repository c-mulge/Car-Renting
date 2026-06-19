import prisma from "../prisma/prismaClient.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import createNotification from "../utils/createNotification.js";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "carental/documents",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const createBooking = asyncHandler(async (req, res) => {
  const { vehicleId, pickupDate, returnDate } = req.body;
  const pickup = new Date(pickupDate);

  const returnD = new Date(returnDate);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (pickup < today) {
    return errorResponse(res, 400, "Pickup date cannot be in the past");
  }

  if (pickup >= returnD) {
    return errorResponse(res, 400, "Return date must be after pickup date");
  }

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

      document: true,
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
  const document = await prisma.document.findUnique({
    where: {
      bookingId: booking.id,
    },
  });

  if (!document) {
    return errorResponse(res, 400, "Documents not uploaded");
  }

  if (booking.vehicle.ownerId !== req.user.id) {
    return errorResponse(res, 403, "Unauthorized");
  }
  if (booking.status !== "PENDING") {
    return errorResponse(res, 400, "Booking already processed");
  }
  if (document.verificationStatus !== "VERIFIED") {
    return errorResponse(res, 400, "Documents not verified");
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },

    data: {
      status: "APPROVED",
    },
  });
  await createNotification(
    booking.userId,
    "Booking Approved",
    "Your booking has been approved.",
  );

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
  await createNotification(
    booking.userId,
    "Booking Rejected",
    "Your booking has been rejected.",
  );

  return successResponse(res, 200, "Booking rejected", updatedBooking);
});

export const uploadDocuments = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!booking) {
    return errorResponse(res, 404, "Booking not found");
  }

  if (booking.userId !== req.user.id) {
    return errorResponse(res, 403, "Unauthorized");
  }

  const aadhaarUpload = await uploadToCloudinary(req.files.aadhaar[0].buffer);

  const licenseUpload = await uploadToCloudinary(req.files.license[0].buffer);

  const document = await prisma.document.create({
    data: {
      bookingId: booking.id,
      aadhaarUrl: aadhaarUpload.secure_url,
      drivingLicenseUrl: licenseUpload.secure_url,
      verificationStatus: "PENDING",
    },
  });

  return successResponse(res, 201, "Documents uploaded", document);
});

export const verifyDocuments = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: req.params.id,
    },

    include: {
      vehicle: true,
      document: true,
    },
  });

  if (!booking) {
    return errorResponse(res, 404, "Booking not found");
  }

  if (booking.vehicle.ownerId !== req.user.id) {
    return errorResponse(res, 403, "Unauthorized");
  }

  const document = await prisma.document.update({
    where: {
      bookingId: booking.id,
    },

    data: {
      verificationStatus: "VERIFIED",
    },
  });
  await createNotification(
    booking.userId,
    "Documents Verified",
    "Your documents have been verified.",
  );

  return successResponse(res, 200, "Documents verified", document);
});

export const rejectDocuments = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: req.params.id,
    },

    include: {
      vehicle: true,
      document: true,
    },
  });

  if (!booking) {
    return errorResponse(res, 404, "Booking not found");
  }

  if (booking.vehicle.ownerId !== req.user.id) {
    return errorResponse(res, 403, "Unauthorized");
  }

  const document = await prisma.document.update({
    where: {
      bookingId: booking.id,
    },

    data: {
      verificationStatus: "REJECTED",
    },
  });
  await createNotification(
    booking.userId,
    "Documents Rejected",
    "Please upload valid documents.",
  );

  return successResponse(res, 200, "Documents rejected", document);
});

export const createDepositOrder = asyncHandler(async (req, res) => {
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

  if (booking.userId !== req.user.id) {
    return errorResponse(res, 403, "Unauthorized");
  }

  if (booking.status !== "APPROVED") {
    return errorResponse(res, 400, "Booking not approved");
  }

  const order = await razorpay.orders.create({
    amount: booking.vehicle.securityDeposit * 100,

    currency: "INR",

    receipt: booking.id,
  });

  return successResponse(res, 200, "Order created", order);
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return errorResponse(res, 400, "Invalid payment signature");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: req.params.id,
    },

    include: {
      vehicle: true,
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,

      amount: booking.vehicle.securityDeposit,
    },
  });

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },

    data: {
      status: "DEPOSIT_PAID",
    },
  });

  return successResponse(res, 200, "Payment verified", updatedBooking);
});

export const mockDepositPaid = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!booking) {
    return errorResponse(res, 404, "Booking not found");
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      status: "DEPOSIT_PAID",
    },
  });

  return successResponse(res, 200, "Mock payment successful", updatedBooking);
});

export const startRental = asyncHandler(async (req, res) => {
  const { pickupOdometer } = req.body;
  if (pickupOdometer < 0) {
    return errorResponse(res, 400, "Invalid pickup odometer");
  }
  if (pickupOdometer === undefined || pickupOdometer === null) {
    return errorResponse(res, 400, "Pickup odometer is required");
  }

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

  if (booking.status !== "DEPOSIT_PAID") {
    return errorResponse(res, 400, "Deposit not paid");
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },

    data: {
      pickupOdometer,
      status: "ACTIVE",
    },
  });

  return successResponse(res, 200, "Rental started", updatedBooking);
});

export const completeRental = asyncHandler(async (req, res) => {
  const { returnOdometer } = req.body;
  if (returnOdometer < 0) {
    return errorResponse(res, 400, "Invalid return odometer");
  }

  if (returnOdometer === undefined || returnOdometer === null) {
    return errorResponse(res, 400, "Return odometer is required");
  }

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

  if (booking.status !== "ACTIVE") {
    return errorResponse(res, 400, "Rental not active");
  }

  const distanceTravelled = returnOdometer - booking.pickupOdometer;

  if (distanceTravelled < 0) {
    return errorResponse(res, 400, "Invalid odometer reading");
  }

  const finalAmount = distanceTravelled * booking.vehicle.pricePerKm;

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },

    data: {
      returnOdometer,
      actualDistance: distanceTravelled,
      finalAmount,
      status: "COMPLETED",
    },
  });
  await createNotification(
    booking.userId,
    "Rental Completed",
    "Your rental has been completed successfully.",
  );
  const refundableAmount = Math.max(
    booking.vehicle.securityDeposit - finalAmount,
    0,
  );

  const extraAmountDue = Math.max(
    finalAmount - booking.vehicle.securityDeposit,
    0,
  );
  return successResponse(res, 200, "Rental completed", {
    booking: updatedBooking,

    distanceTravelled,

    finalAmount,

    depositPaid: booking.vehicle.securityDeposit,
    refundableAmount,

    extraAmountDue,
  });
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!booking) {
    return errorResponse(res, 404, "Booking not found");
  }

  if (booking.userId !== req.user.id) {
    return errorResponse(res, 403, "Unauthorized");
  }

  const cancellableStatuses = ["PENDING", "APPROVED", "DEPOSIT_PAID"];

  if (!cancellableStatuses.includes(booking.status)) {
    return errorResponse(
      res,
      400,
      `Cannot cancel booking with status ${booking.status}`,
    );
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },

    data: {
      status: "CANCELLED",
    },
  });

  return successResponse(
    res,
    200,
    "Booking cancelled successfully",
    updatedBooking,
  );
});
