import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, getMyNotifications);

router.patch("/read-all", protect, markAllNotificationsRead); 

export default router;
