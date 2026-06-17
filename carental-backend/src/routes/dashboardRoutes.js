import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  getOwnerDashboard,
  getUserDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/owner", protect, authorize("OWNER"), getOwnerDashboard);

router.get("/user", protect, authorize("USER"), getUserDashboard);

export default router;
