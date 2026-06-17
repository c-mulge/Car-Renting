import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  createReview,
  getVehicleReviews,
  getVehicleRatingSummary,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, authorize("USER"), createReview);

router.get("/vehicle/:vehicleId", getVehicleReviews);

router.get("/vehicle/:vehicleId/summary", getVehicleRatingSummary);

export default router;
