import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  getAdminDashboard,
  getAllUsers,
  getAllVehiclesAdmin,
  getAllBookings,
  blockUser,
  unblockUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("ADMIN"), getAdminDashboard);
router.get("/users", protect, authorize("ADMIN"), getAllUsers);

router.get("/vehicles", protect, authorize("ADMIN"), getAllVehiclesAdmin);

router.get("/bookings", protect, authorize("ADMIN"), getAllBookings);

router.patch("/users/:id/block", protect, authorize("ADMIN"), blockUser);

router.patch("/users/:id/unblock", protect, authorize("ADMIN"), unblockUser);

export default router;
