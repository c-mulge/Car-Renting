import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  approveBooking,
  rejectBooking,
} from "../controllers/bookingController.js";
import authorize from "../middleware/roleMiddleware.js";
const router = express.Router();

router.post("/", protect, authorize("USER"), createBooking);
router.get("/my-bookings", protect, authorize("USER"), getMyBookings);
router.get("/owner-bookings", protect, authorize("OWNER"), getOwnerBookings);
router.patch("/:id/approve", protect, authorize("OWNER"), approveBooking);

router.patch("/:id/reject", protect, authorize("OWNER"), rejectBooking);
export default router;
