import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, getUserDashboard } from "../controllers/userController.js";
import userProtect from "../middleware/userAuthMiddleware.js";



const router = express.Router();

// Public routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", userProtect, getUserProfile);
router.get("/dashboard", userProtect, getUserDashboard);

router.put("/profile", protect, upload.single("profileImage"), updateUserProfile);

export default router;
