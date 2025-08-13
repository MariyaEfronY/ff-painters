import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import userProtect from "../middleware/userAuthMiddleware.js";

const router = express.Router();

// Multer config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/userProfileImages"));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Public routes
router.post("/signup", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", userProtect, getUserProfile);
router.put("/profile", userProtect, upload.single("profileImage"), updateUserProfile);

export default router;
