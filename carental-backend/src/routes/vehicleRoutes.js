import express from "express";

import {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  uploadVehicleImage,
  getMyVehicles,
  updateVehicle,
  deleteVehicle,
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
router.get("/my-vehicles", protect, authorize("OWNER"), getMyVehicles);

router.get("/:id", getVehicleById);
router.post(
  "/:id/images",
  protect,
  authorize("OWNER"),
  upload.single("image"),
  uploadVehicleImage,
);

router.put("/:id", protect, authorize("OWNER"), updateVehicle);
router.delete("/:id", protect, authorize("OWNER"), deleteVehicle);

export default router;
