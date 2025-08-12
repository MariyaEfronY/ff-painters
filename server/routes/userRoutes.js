import express from "express";
import { registerUser, loginUser, getUserProfile, getUserDashboard } from "../controllers/userController.js";
import userProtect from "../middleware/userAuthMiddleware.js";



const router = express.Router();

// Public routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", userProtect, getUserProfile);
router.get("/dashboard", userProtect, getUserDashboard);

export default router;
