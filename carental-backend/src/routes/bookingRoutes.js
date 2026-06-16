import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  approveBooking,
  rejectBooking,
  uploadDocuments,
  verifyDocuments,
  rejectDocuments,
} from "../controllers/bookingController.js";
import authorize from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/", protect, authorize("USER"), createBooking);
router.get("/my-bookings", protect, authorize("USER"), getMyBookings);
router.get("/owner-bookings", protect, authorize("OWNER"), getOwnerBookings);
router.patch("/:id/approve", protect, authorize("OWNER"), approveBooking);
router.post(
  "/:id/documents",
  protect,
  authorize("USER"),
  upload.fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  uploadDocuments,
);

router.patch(
  "/:id/verify-documents",
  protect,
  authorize("OWNER"),
  verifyDocuments,
);

router.patch(
  "/:id/reject-documents",
  protect,
  authorize("OWNER"),
  rejectDocuments,
);

router.patch("/:id/reject", protect, authorize("OWNER"), rejectBooking);
export default router;
