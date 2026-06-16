import express from "express";

import {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  uploadVehicleImage,
} from "../controllers/vehicleController.js";

import { vehicleValidation } from "../validations/vehicleValidation.js";

import validate from "../middleware/validate.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("OWNER"),
  vehicleValidation,
  validate,
  addVehicle,
);

router.get("/", getAllVehicles);

router.get("/:id", getVehicleById);
router.post(
  "/:id/images",
  protect,
  authorize("OWNER"),
  upload.single("image"),
  uploadVehicleImage,
);

export default router;
