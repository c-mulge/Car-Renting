import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  registerUser,
  registerOwner,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register-user", registerUser);

router.post("/register-owner", registerOwner);

router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);

export default router;
