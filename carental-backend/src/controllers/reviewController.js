import prisma from "../prisma/prismaClient.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const createReview = asyncHandler(async (req, res) => {
  const { vehicleId, rating, comment } = req.body;
  if (
  rating < 1 ||
  rating > 5
) {
  return errorResponse(
    res,
    400,
    "Rating must be between 1 and 5"
  );
}

if (
  !comment ||
  comment.trim().length < 10
) {
  return errorResponse(
    res,
    400,
    "Comment must be at least 10 characters"
  );
}

  const completedBooking = await prisma.booking.findFirst({
    where: {
      userId: req.user.id,
      vehicleId,
      status: "COMPLETED",
    },
  });

  if (!completedBooking) {
    return errorResponse(
      res,
      400,
      "You can review only after completing a rental",
    );
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      userId: req.user.id,
      vehicleId,
    },
  });

  if (existingReview) {
    return errorResponse(res, 400, "Review already submitted");
  }

  const review = await prisma.review.create({
    data: {
      userId: req.user.id,
      vehicleId,
      rating,
      comment,
    },
  });

  return successResponse(res, 201, "Review submitted successfully", review);
});

export const getVehicleReviews = asyncHandler(async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: {
      vehicleId: req.params.vehicleId,
    },

    include: {
      user: {
        select: {
          fullName: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return successResponse(res, 200, "Reviews fetched successfully", reviews);
});

export const getVehicleRatingSummary = asyncHandler(async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: {
      vehicleId: req.params.vehicleId,
    },
  });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  return successResponse(res, 200, "Rating summary fetched", {
    averageRating: Number(averageRating.toFixed(1)),
    totalReviews,
  });
});
