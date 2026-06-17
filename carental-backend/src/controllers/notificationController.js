import prisma from "../prisma/prismaClient.js";
import asyncHandler from "../utils/asyncHandler.js";

import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: {
      userId: req.user.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return successResponse(res, 200, "Notifications fetched", notifications);
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await prisma.notification.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!notification) {
    return errorResponse(res, 404, "Notification not found");
  }

  if (notification.userId !== req.user.id) {
    return errorResponse(res, 403, "Unauthorized");
  }

  const updatedNotification = await prisma.notification.update({
    where: {
      id: req.params.id,
    },

    data: {
      isRead: true,
    },
  });

  return successResponse(
    res,
    200,
    "Notification marked read",
    updatedNotification,
  );
});
